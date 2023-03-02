from app.models import db, User, Icon
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@email.com', password='password',birthday='1999-01-01', score=100, default_icon=1)
    user1 = User(
        username='abel704', email='abel@email.com', password='password',birthday='1999-01-01', score=100, default_icon=4)
    user2 = User(
        username='labbit', email='labbit@email.com', password='password',birthday='1999-01-01', score=100, default_icon=7)
    user3 = User(
        username='nyll', email='nyll@email.com', password='password',birthday='1999-01-01', score=100, default_icon=1)
    user4 = User(
        username='jkim', email='jkim@email.com', password='password',birthday='1999-01-01', score=100, default_icon=4)
    user5 = User(
        username='dchung', email='dchung@email.com', password='password',birthday='1999-01-01', score=100, default_icon=7)

    db.session.add(demo)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)

    db.session.commit()

    icon1 = Icon(user_id=1, icon=1)
    icon2 = Icon(user_id=2, icon=4)
    icon3 = Icon(user_id=3, icon=7)
    icon4 = Icon(user_id=4, icon=1)
    icon5 = Icon(user_id=5, icon=4)
    icon6 = Icon(user_id=6, icon=7)
    icon7 = Icon(user_id=1, icon=68)
    icon8 = Icon(user_id=2, icon=21)
    icon9 = Icon(user_id=3, icon=26)
    icon10 = Icon(user_id=4, icon=13)
    icon11 = Icon(user_id=5, icon=141)
    icon12 = Icon(user_id=6, icon=60)

    db.session.add(icon1)
    db.session.add(icon2)
    db.session.add(icon3)
    db.session.add(icon4)
    db.session.add(icon5)
    db.session.add(icon6)
    db.session.add(icon7)
    db.session.add(icon8)
    db.session.add(icon9)
    db.session.add(icon10)
    db.session.add(icon11)
    db.session.add(icon12)

    db.session.commit()




# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
