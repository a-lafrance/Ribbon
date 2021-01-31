from django.db import models
from . import utils

import datetime

class GroupchatWrappedResult(models.Model):
    title = models.CharField(max_length=utils.CHATNAME_MAX_LEN)
    msg_count = models.IntegerField()

    most_frequent_time = models.IntegerField()
    most_frequent_time_msg_count = models.IntegerField()

    most_total_reacts_member = models.CharField(max_length=utils.MEMBER_MAX_LEN)
    most_total_reacts = models.IntegerField()

    longest_streak_start = models.PositiveBigIntegerField()
    longest_streak_end = models.PositiveBigIntegerField()

    first_msg = models.CharField(max_length=utils.MSG_MAX_LEN)

    def create_from_json(params: dict):
        title = params['title']
        msg_count = params['totalMessages']

        most_frequent_time, most_frequent_time_msg_count = params['mostFrequentTime']
        most_total_reacts_member, most_total_reacts = params['mostTotalReacts']

        longest_streak_start, longest_streak_end = params['longestStreak']
        longest_streak_start = int(longest_streak_start)
        longest_streak_end = int(longest_streak_end)

        first_msg = params['firstMessage']

        result = GroupchatWrappedResult.objects.create(
            title=title,
            msg_count=msg_count,
            most_frequent_time=most_frequent_time,
            most_frequent_time_msg_count=most_frequent_time_msg_count,
            most_total_reacts_member=most_total_reacts_member,
            most_total_reacts=most_total_reacts,
            longest_streak_start=longest_streak_start,
            longest_streak_end=longest_streak_end,
            first_msg=first_msg
        )

        for i, (icon, count) in enumerate(params['reactCounts']):
            result.reactcount_set.create(index=i, icon=icon, count=count)

        for i, (word, count) in enumerate(params['wordCounts']):
            result.wordcount_set.create(index=i, word=word, count=count)

        for member, (role, score) in params['roles'].items():
            result.role_set.create(member=member, role=role, score=score)

        return result

    def json(self):
        return {
            'id' : self.id,
            'title' : self.title,
            'totalMessages' : self.msg_count,
            'mostFrequentTime' : [self.most_frequent_time, self.most_frequent_time_msg_count],
            'mostTotalReacts' : [self.most_total_reacts_member, self.most_total_reacts],
            'reactCounts' : {react.index : (react.icon, react.count) for react in self.reactcount_set.all()},
            'wordCounts' : {word.index : (word.word, word.count) for word in self.wordcount_set.all()},
            'longestStreak' : [self.longest_streak_start, self.longest_streak_end],
            'firstMessage' : self.first_msg,
            'roles' : {role.member : [role.role, role.score] for role in self.role_set.all()}
        }

class ReactCount(models.Model):
    result = models.ForeignKey(GroupchatWrappedResult, on_delete=models.CASCADE)

    index = models.IntegerField()
    icon = models.CharField(max_length=utils.ICON_MAX_LEN)
    count = models.IntegerField()

class WordCount(models.Model):
    result = models.ForeignKey(GroupchatWrappedResult, on_delete=models.CASCADE)

    index = models.IntegerField()
    word = models.CharField(max_length=utils.WORD_MAX_LEN)
    count = models.IntegerField()

class Role(models.Model):
    result = models.ForeignKey(GroupchatWrappedResult, on_delete=models.CASCADE)

    member = models.CharField(max_length=utils.MEMBER_MAX_LEN)
    role = models.CharField(max_length=utils.ROLE_MAX_LEN)
    score = models.FloatField()
