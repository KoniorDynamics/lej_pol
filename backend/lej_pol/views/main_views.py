from flask import Blueprint, render_template, url_for
from werkzeug.utils import redirect

from lej_pol.forms.forms import WaterForm

bp_main = Blueprint("main", __name__, url_prefix='/')


@bp_main.route("/", methods=["GET"])
def home():
    return "init23"


@bp_main.route("/temp", methods=["GET", "POST"])
def add():
     form = RegistrationForm(request.form)
    # if request.method == 'POST' and form.validate():
    #     user = User(form.username.data, form.email.data,
    #                 form.password.data)
    #     db_session.add(user)
    #     flash('Thanks for registering')
    #     return redirect(url_for('login'))
    # return render_template('register.html', form=form)
    return render_template("water_form.html", form=form)
