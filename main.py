from flask import Flask, render_template
from flask.signals import template_rendered

app = Flask(__name__)

@app.route('/')
def index(): 
    return 'Welcome Flask'
#render_template('temp/index.html')
if __name__ == '__main__':
    app.run(debug=True)