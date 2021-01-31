from django.db import models

from . import utils

class GroupchatWrappedResult(models.Model):
    most_frequent_time = models.IntegerField()
    most_frequent_time_msg_count = models.IntegerField()

    most_total_reacts_member = models.CharField(max_length=utils.MEMBER_MAX_LEN)
    most_total_reacts = models.IntegerField()

    longest_streak_start = models.DateTimeField('Longest streak start')
    longest_streak_end = models.DateTimeField('Longest streak end')

    first_msg = models.CharField(max_length=utils.MSG_MAX_LEN)

    def json(self):
        return {
            'mostFrequentTime' : [self.most_frequent_time, self.most_frequent_time_msg_count],
            'mostTotalReacts' : [self.most_total_reacts_member, self.most_total_reacts],
            'reactCounts' : {react.icon : react.count for react in self.reactcount_set.all()},
            # TODO: turn the dates into strings
            # 'longest_streak' : [self.longest_streak_start, self.longest_streak_end]
            'firstMessage' : self.first_msg,
            'roles' : {role.member : role.role for role in self.role_set.all()}
        }

class ReactCount(models.Model):
    result = models.ForeignKey(GroupchatWrappedResult, on_delete=models.CASCADE)

    icon = models.CharField(max_length=utils.ICON_MAX_LEN)
    count = models.IntegerField()

class Role(models.Model):
    result = models.ForeignKey(GroupchatWrappedResult, on_delete=models.CASCADE)

    member = models.CharField(max_length=utils.MEMBER_MAX_LEN)
    role = models.CharField(max_length=utils.ROLE_MAX_LEN)
