from app.models import db, User
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@email.com', password='password',birthday='1999-01-01')
    user1 = User(
        username='abel704', email='abel@email.com', password='password',birthday='1999-01-01')
    user2 = User(
        username='labbit', email='labbit@email.com', password='password',birthday='1999-01-01')
    user3 = User(
        username='nyll', email='nyll@email.com', password='password',birthday='1999-01-01')
    user4 = User(
        username='jkim', email='jkim@email.com', password='password',birthday='1999-01-01')
    user5 = User(
        username='dchung', email='dchung@email.com', password='password',birthday='1999-01-01')

    db.session.add(demo)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
