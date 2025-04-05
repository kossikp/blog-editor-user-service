const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');
const { User } = require('../models/User');
const { user, createUser } = require('./testUtils');

chai.use(chaiHttp);
chai.config.includeStack = true;

let should = chai.should();
let agent = chai.request.agent(app);

describe('LoginController.js tests', () => {

    beforeEach(done => {
        User.deleteMany({}).then(async () => {
            done();
        }).catch(err => done(err));
    });

    describe('Login with no data', () => {
        describe('POST /api/v1/users/login', () => {
            it('Should not login when no data is provided', done => {
                chai.request(app)
                    .post('/api/v1/users/login')
                    .send({})
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('email').that.equals('Email field is required!');
                        res.body.errors.should.have.property('password').that.equals('Password field is required!');
                        done();
                    });
            });
        });
    });

   

    describe("Login without 'email'", () => {
        describe('POST /api/v1/users/login', () => {
            it("Should not login without 'email'", done => {

                const data = {
                    password: user.password,
                };

                chai.request(app)
                    .post('/api/v1/users/login')
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

    describe("Login without a valid 'email'", () => {
        describe('POST /api/v1/users/login', () => {
            it("Should not login without a valid 'email'", done => {

                const data = {
                    email: 'test@example',
                    password: user.password,
                };

                chai.request(app)
                    .post('/api/v1/users/login')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('email').that.equals('Email should be valid!');
                        done();
                    });
            });
        });
    });

    describe("Login without 'password'", () => {
        describe('POST /api/v1/users/login', () => {
            it("Should not login without 'password'", done => {

                const data = {
                    email: user.email,
                };

                chai.request(app)
                    .post('/api/v1/users/login')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(400);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('errors').that.is.an('object');
                        res.body.errors.should.have.property('password').that.equals('Password field is required!');
                        done();
                    });
            });
        });
    });

    describe("Login with incorrect data", () => {
        describe('POST /api/v1/users/login', () => {
            it("Should not login when data is incorrect", done => {

                const data = {
                    email: user.email,
                    password: 'incorrectPassword',
                };

                chai.request(app)
                    .post('/api/v1/users/login')
                    .send(data)
                    .end((err, res) => {
                        if (err) done(err);
                        res.should.have.status(404);
                        res.body.should.be.an('object');
                        res.body.should.have.property('success').equal(false);
                        res.body.should.have.property('message').that.equals('Incorrect email or password!');
                        done();
                    });
            });
        });
    });

    describe("Login with valid and correct data", () => {
        describe('POST /api/v1/users/login', () => {
            it("Should login when data is valid and correct", done => {
                agent.post('/api/v1/users/register')
                    .send(user)
                    .then(async () => {
                        const data = {
                            email: user.email,
                            password: user.password,
                        };
                        return agent.post('/api/v1/users/login')
                        .send(data)
                        .end((err, res) => {
                            if (err) done(err);
                            res.should.have.status(200);
                            res.body.should.be.an('object');
                            res.body.should.have.property('success').equal(true);
                            res.body.should.have.property('token').that.is.a('string');
                            res.body.should.have.property('message').that.equals('User successfully logged in!');
                            done();
                        });

                    })
            });
        });
    });


});