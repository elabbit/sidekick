from app.models import db, TodoTask

def seed_tasks():
    task1 = TodoTask(
        list_id=1, description="Do laundry"
    )
    task2 = TodoTask(
        list_id=1, description="Buy groceries"
    )
    task3 = TodoTask(
        list_id=2, description="Code DSA"
    )
    task4 = TodoTask(
        list_id=2, description="Work on project"
    )
    task5 = TodoTask(
        list_id=3, description="Code DSA"
    )
    task6 = TodoTask(
        list_id=3, description="Work on project"
    )
    task7 = TodoTask(
        list_id=4, description="Code DSA"
    )
    task8 = TodoTask(
        list_id=4, description="Work on project"
    )
    task9 = TodoTask(
        list_id=5, description="Code DSA"
    )
    task10 = TodoTask(
        list_id=5, description="Work on project"
    )
    task11= TodoTask(
        list_id=6, description="Code DSA"
    )
    task12= TodoTask(
        list_id=6, description="Work on project"
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
    db.session.add(task9)
    db.session.add(task10)
    db.session.add(task11)
    db.session.add(task12)

    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE todo_tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
