from django.db import models
from . import utils

import datetime

class GroupchatWrappedResult(models.Model):
    most_frequent_time = models.IntegerField()
    most_frequent_time_msg_count = models.IntegerField()

    most_total_reacts_member = models.CharField(max_length=utils.MEMBER_MAX_LEN)
    most_total_reacts = models.IntegerField()

    longest_streak_start = models.DateField()
    longest_streak_end = models.DateField()

    first_msg = models.CharField(max_length=utils.MSG_MAX_LEN)

    def create_from_json(params: dict):
        most_frequent_time, most_frequent_time_msg_count = params['mostFrequentTime']
        most_total_reacts_member, most_total_reacts = params['mostTotalReacts']

        longest_streak_start, longest_streak_end = params['longestStreak']
        longest_streak_start = datetime.date.fromisoformat(longest_streak_start)
        longest_streak_end = datetime.date.fromisoformat(longest_streak_end)

        first_msg = params['firstMessage']

        result = GroupchatWrappedResult.objects.create(
            most_frequent_time=most_frequent_time,
            most_frequent_time_msg_count=most_frequent_time_msg_count,
            most_total_reacts_member=most_total_reacts_member,
            most_total_reacts=most_total_reacts,
            longest_streak_start=longest_streak_start,
            longest_streak_end=longest_streak_end,
            first_msg=first_msg
        )

        for icon, count in params['reactCounts']:
            result.reactcount_set.create(icon=icon, count=count)

        for member, role in params['roles'].items():
            result.role_set.create(member=member, role=role)

        return result

    def json(self):
        return {
            'id' : self.id,
            'mostFrequentTime' : [self.most_frequent_time, self.most_frequent_time_msg_count],
            'mostTotalReacts' : [self.most_total_reacts_member, self.most_total_reacts],
            'reactCounts' : {react.icon : react.count for react in self.reactcount_set.all()},
            'longestStreak' : [self.longest_streak_start.isoformat(), self.longest_streak_end.isoformat()],
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
