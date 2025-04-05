const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');
const { User } = require('../models/User');
const { user, createUser } = require('./testUtils');

chai.use(chaiHttp);
chai.config.includeStack = true;

let should = chai.should();

describe('RegisterController.js tests', () => {

    beforeEach(done => {
        User.deleteMany({}).then(async () => {
            done();
        }).catch(err => done(err));
    });

    describe('Register with no data', () => {
        describe('POST /api/v1/users/register', () => {
            it('Should not register when no data is provided', done => {
                chai.request(app)
                    .post('/api/v1/users/register')
                    .send({})
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('firstName').that.equals('First name field is required!');
                        res.body.errors.should.have.property('lastName').that.equals('Last name field is required!');
                        res.body.errors.should.have.property('email').that.equals('Email field is required!');
                        res.body.errors.should.have.property('password').that.equals('Password field is required!');
                        res.body.errors.should.have.property('confirmPassword').that.equals('Confirm Password field is required!');
                        done();
                    });
            });
        });
    });

    describe("Register without 'first name'", () => {
        describe('POST /api/v1/users/register', () => {
            it("Should not register without 'first name'", done => {
      
                const data = {
                    lastName: 'Test',
                    email: 'test@example.com',
                    password: 'password',
                    confirmPassword: 'password'
                };

                chai.request(app)
                    .post('/api/v1/users/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('firstName').that.equals('First name field is required!');
                        done();
                    });
            });
        });
    });

    describe("Register without 'last name'", () => {
        describe('POST /api/v1/users/register', () => {
            it("Should not register without 'last name'", done => {
      
                const data = {
                    firstName: 'Test',
                    email: 'test@example.com',
                    password: 'password',
                    confirmPassword: 'password'
                };

                chai.request(app)
                    .post('/api/v1/users/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('lastName').that.equals('Last name field is required!');
                        done();
                    });
            });
        });
    });

    describe("Register without 'email'", () => {
        describe('POST /api/v1/users/register', () => {
            it("Should not register without 'email'", done => {
      
                const data = {
                    firstName: 'Test',
                    lastName: 'Test',
                    password: 'password',
                    confirmPassword: 'password'
                };

                chai.request(app)
                    .post('/api/v1/users/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('email').that.equals('Email field is required!');
                        done();
                    });
            });
        });
    });

    describe("Register without a valid 'email'", () => {
        describe('POST /api/v1/users/register', () => {
            it("Should not register without a valid 'email'", done => {
      
                const data = {
                    firstName: 'Test',
                    lastName: 'Test',
                    email: 'test@example',
                    password: 'password',
                    confirmPassword: 'password'
                };

                chai.request(app)
                    .post('/api/v1/users/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('email').that.equals('Email should be valid and be maximum 128 characters!');
                        done();
                    });
            });
        });
    });

    describe("Register without 'password'", () => {
        describe('POST /api/v1/users/register', () => {
            it("Should not register without 'password'", done => {
      
                const data = {
                    firstName: 'Test',
                    lastName: 'Test',
                    email: 'test@example.com',
                    confirmPassword: 'password'
                };

                chai.request(app)
                    .post('/api/v1/users/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('password').that.equals('Passwords do not match!');
                        done();
                    });
            });
        });
    });

    describe("Register without 'confirm password'", () => {
        describe('POST /api/v1/users/register', () => {
            it("Should not register without 'confirm password'", done => {
      
                const data = {
                    firstName: 'Test',
                    lastName: 'Test',
                    email: 'test@example.com',
                    password: 'password'
                };

                chai.request(app)
                    .post('/api/v1/users/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('password').that.equals('Passwords do not match!');
                        res.body.errors.should.have.property('confirmPassword').that.equals('Confirm Password field is required!');
                        done();
                    });
            });
        });
    });

    describe("Register with mismatch 'password' and 'confirm password'", () => {
        describe('POST /api/v1/users/register', () => {
            it("Should not register when 'password' and 'confirm password' mismatch", done => {
      
                const data = {
                    firstName: 'Test',
                    lastName: 'Test',
                    email: 'test@example.com',
                    password: 'password',
                    confirmPassword: 'confirmPassword'
                };

                chai.request(app)
                    .post('/api/v1/users/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('password').that.equals('Passwords do not match!');
                        done();
                    });
            });
        });
    });

    describe("Register when POST data is valid", () => {
        describe('POST /api/v1/users/register', () => {
            it("Should register when POST data is valid", done => {
      
                const data = {
                    firstName: 'Test',
                    lastName: 'Test',
                    email: 'test@example.com',
                    password: 'password',
                    confirmPassword: 'password'
                };

                chai.request(app)
                    .post('/api/v1/users/register')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(200);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(true);
                        res.body.should.have.property('message').that.equals('User successfully registered!');
                        res.body.should.have.property('data').that.is.an('object');
                        res.body.data.should.have.property('firstName').that.equals(data.firstName);
                        res.body.data.should.have.property('lastName').that.equals(data.lastName);
                        res.body.data.should.have.property('email').that.equals(data.email);
                        done();
                    });
            });
        });
    });


});