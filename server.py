import pdfkit
from flask import request, render_template, Flask, jsonify
app = Flask(__name__)

@app.route('/form_data', methods=['POST'])
def form_data():
    
    if request.json:
        form_data = request.json['form_data']
        print(form_data['moving_reason'])
        template = render_template('autocertificazione_model.html', form_data = form_data)            
        pdf = pdfkit.from_string(template, 'autocertificazione.pdf')

        return jsonify(status=200)
    return jsonify(status=200)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
