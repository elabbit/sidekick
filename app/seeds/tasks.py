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

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)

    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE todo_tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
