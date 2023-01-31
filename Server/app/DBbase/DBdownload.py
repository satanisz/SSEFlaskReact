from flask import Blueprint, send_file


download_route = Blueprint('main', __name__)


@download_route.route('/download')
def download():
    """

    :return:
    """

    return send_file("DBbase\\DBmockup.db3", as_attachment=True)
