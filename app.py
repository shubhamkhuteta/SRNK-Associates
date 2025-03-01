import os
import csv
import hashlib
from flask import Flask, request, render_template, redirect, url_for, session, send_file

app = Flask(__name__)
app.secret_key = 'your_secret_key'

data_file = 'users.csv'

# Hash function for passwords
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Check login credentials
def check_credentials(pan, password):
    hashed_password = hash_password(password)
    with open(data_file, newline='') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            if row[0] == pan and row[1] == hashed_password:
                return True
    return False

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        pan = request.form['pan']
        password = request.form['password']
        if check_credentials(pan, password):
            session['pan'] = pan
            return redirect(url_for('dashboard'))
        else:
            return "Invalid credentials, try again."
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'pan' not in session:
        return redirect(url_for('login'))
    return '''<h1>Welcome {}</h1>
              <a href='/download'>Download Info</a> |
              <a href='/upload'>Upload Info</a> |
              <a href='/logout'>Logout</a>'''.format(session['pan'])

@app.route('/download')
def download():
    if 'pan' not in session:
        return redirect(url_for('login'))
    return send_file(data_file, as_attachment=True)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if 'pan' not in session:
        return redirect(url_for('login'))
    if request.method == 'POST':
        file = request.files['file']
        if file:
            file.save(os.path.join("uploads", file.filename))
            return "File uploaded successfully."
    return '''<form method="post" enctype="multipart/form-data">
                <input type="file" name="file">
                <input type="submit" value="Upload">
              </form>'''

@app.route('/logout')
def logout():
    session.pop('pan', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True)
