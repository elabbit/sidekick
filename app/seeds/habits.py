from app.models import db, Habit

def seed_habits():
    abel_habit1 = Habit(
        user_id=2, name='Try a new cuisine or food', frequency=1, daily=False
    )
    abel_habit2 = Habit(
        user_id=2, name='Reach out to a hiring manager', frequency=10, daily=False
    )
    eddie_habit1 = Habit(
        user_id=3, name='Wake up before 11AM', frequency=1, daily=True
    )
    eddie_habit2 = Habit(
        user_id=3, name='Quit eating baked goods', frequency=1, daily=True
    )
    eddie_habit3 = Habit(
        user_id=3, name='apply to SWE roles', frequency=5, daily=True
    )
    lynn_habit1 = Habit(
        user_id=4, name='Exercise/Stretch', frequency=4, daily=False
    )
    lynn_habit2 = Habit(
        user_id=4, name='Drink 1 cup of water', frequency=4, daily=True
    )
    jonathan_habit1 = Habit(
        user_id=5, name='Sleep by 12AM', frequency=1, daily=True
    )
    jonathan_habit2 = Habit(
        user_id=5, name='Wake up before 11AM', frequency=5, daily=False
    )
    jonathan_habit3 = Habit(
        user_id=5, name='attend a networking event', frequency=1, daily=False
    )
    david_habit1 = Habit(
        user_id=6, name='Go on a walk or be outdoors for at least 10min', frequency=1, daily=True
    )
    david_habit2 = Habit(
        user_id=6, name='Reach out to a friend or aquintance about job opportunities', frequency=2, daily=False
    )


    db.session.add(abel_habit1)
    db.session.add(abel_habit2)
    db.session.add(eddie_habit1)
    db.session.add(eddie_habit2)
    db.session.add(eddie_habit3)
    db.session.add(lynn_habit1)
    db.session.add(lynn_habit2)
    db.session.add(jonathan_habit1)
    db.session.add(jonathan_habit2)
    db.session.add(jonathan_habit3)
    db.session.add(david_habit1)
    db.session.add(david_habit2)

    db.session.commit()

def undo_habits():
    db.session.execute('TRUNCATE habits RESTART IDENTITY CASCADE;')
    db.session.commit()
