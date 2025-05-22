"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from sqlalchemy import select
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/registro', methods=['POST'])
def register():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email y contraseña son requeridos"}), 400


    stmt = select(User).where(User.email == data['email'])
    existing_user = db.session.execute(stmt).scalar_one_or_none()

    if existing_user:
        return jsonify({"error": "Este correo ya está registrado"}), 409


    hashed_password = generate_password_hash(data['password'])

    new_user = User(
        email=data['email'],
        password=hashed_password,
        is_active=True
    )

    try:
        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=str(new_user.id))
        return jsonify({"msg": "Registro exitoso", "token": token}), 201
    except Exception as e:
        db.session.rollback()
        print("Error al registrar:", e)
        return jsonify({"error": "Error del servidor"}), 500


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Email y contraseña son requeridos"}), 400

    stmt = select(User).where(User.email == data['email'])
    user = db.session.execute(stmt).scalar_one_or_none()

    if not user:
        return jsonify({"error": "El correo no está registrado"}), 404

    if not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Correo o contraseña incorrectos"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"msg": "Inicio de sesión exitoso", "token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def get_user_info():
    try:
        user_id = get_jwt_identity()
        stmt = select(User).where(User.id == user_id)
        user = db.session.execute(stmt).scalar_one_or_none()

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        return jsonify(user.serialize()), 200
    except Exception as e:
        print("Error en endpoint privado:", e)
        return jsonify({"error": "Error del servidor"}), 500