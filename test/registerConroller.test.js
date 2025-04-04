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
            await createUser(user);
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
                        res.body.errors.should.have.property('email').that.equals('Email field is required');
                        res.body.errors.should.have.property('password').that.equals('Password field is required');
                        res.body.errors.should.have.property('confirmPassword').that.equals('Confirm Password field is required');
                        done();
                    });
            });
        });
    });
});