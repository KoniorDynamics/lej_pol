from flask_swagger_ui import get_swaggerui_blueprint

bp_swagger = get_swaggerui_blueprint(
    '/swagger',
    '/static/swagger.json',
    config={
        'app_name': "lej_pol"
    }
)
