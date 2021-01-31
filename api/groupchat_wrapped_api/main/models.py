from django.db import models

# WrappedResult:
class GroupchatWrappedResult(models.Model):
    pass
    # most frequent time
    # most frequent time message count
    # most total reacts member
    # most total reacts count
    # longest streak start
    # longest streak end
    # first message

# ReactCount:
class ReactCount(models.Model):
    pass
    # WrappedResult foreign key
    # react icon
    # react count

# Role:
class Role(models.Model):
    pass
    # WrappedResult foreign key
    # member
    # role
