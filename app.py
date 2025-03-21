from flask import *
from flask_sqlalchemy import *
from flask_login import *
from werkzeug.utils import *
from flask_migrate import Migrate
from datetime import timedelta
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Конфигурация базы данных
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_filename = db.Column(db.String(120))
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/')
@login_required
def home():
    return render_template('home.html', username=current_user.username)

@app.route('/news')
def get_news():
    news_items = News.query.all()
    return jsonify([{'title': news.title, 'content': news.content, 'image': news.image_filename} for news in news_items])

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/add_news', methods=['GET', 'POST'])
def add_news():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        image = request.files['image']

        # Сохранение изображения
        if image:
            filename = secure_filename(image.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)

            # Добавление новости в базу данных
            new_news = News(title=title, content=content, image_filename=filename)
            db.session.add(new_news)
            db.session.commit()

        return redirect(url_for('home'))

    return render_template('add_news.html')
app.config['REMEMBER_COOKIE_DURATION'] = timedelta(days=7)  # Продолжительность сессии 7 дней

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(username=username).first()
        if user and (user.password == password):
            remember = request.form.get('remember') == 'on'
            login_user(user, remember=remember)
            return redirect(url_for('home'))
        else:
            flash('Неверные имя пользователя или пароль.')

    return render_template('login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if User.query.filter_by(username=username).first():
            flash('Пользователь с таким именем уже существует.')
        else:
            new_user = User(username=username, password=password)
            db.session.add(new_user)
            db.session.commit()
            flash('Вы успешно зарегистрировались!')
            return redirect(url_for('login'))

    return render_template('register.html')


@app.route('/teams')
def get_teams():
    teams = [
        {"name": "Витязь", "logo": "static/витязь.png", "description": "Хоккейный клуб «Витязь» – клуб Континентальной хоккейной лиги. Выступает в КХЛ с первого сезона 2008/09."},
        {"name": "СКА", "logo": "static/ска.png", "description": "Хоккейная команда СКА образована в 1946 году. Участвует в чемпионатах страны на высшем уровне с сезона 1946/47. Двукратный обладатель Кубка Гагарина. Чемпион России. Двукратный серебряный призер чемпионата России. Шестикратный бронзовый призер чемпионатов СССР и России. Трехкратный обладатель Кубка Континента. Четырехкратный обладатель Кубка Шпенглера. Единственный представитель Санкт-Петербурга в Континентальной Хоккейной Лиге."},
        {"name": "Сочи", "logo": "static/сочи.png","description": "Заявление о том, что в Сочи появится хоккейный клуб, было озвучено сразу после Зимних Олимпийских игр 2014 года, для которых в городе была построена масштабная спортивная инфраструктура.30 апреля 2014 года на общем собрании Правления Континентальной хоккейной лиги клуб из Краснодарского края был принят в состав сильнейшей лиги континента."},
        {"name": "Спартак", "logo": "static/спартак.png","description": ""},
        {"name": "Торпедо", "logo": "static/торпедо.png", "description": ""},
    ]

    return jsonify(teams)

@app.route('/players')
def players():
    return 1

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

@app.route('/standings')
def standings():
    return render_template('standings.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run()

