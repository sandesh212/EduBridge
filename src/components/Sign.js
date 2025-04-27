import React, { Component } from 'react';
class Signup extends Component {
    render(){
        return(
            <div>
                <section className="signup">
                    <div className="container mt-5">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign up</h2>
                                <form className="register-form" id="register-form">
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            <i class="zmdi zmdi-account material-icons-name"></i>
                                        </label>
                                        <input type="text" name="name" id="name" autoComplete="off" placeholder="Enter name"></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="LastName">
                                            <i class="zmdi zmdi-account material-icons-name"></i>
                                        </label>
                                        <input type="LastName" name="LastName" id="LastName" autoComplete="off" placeholder="Enter Last name"></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ContactNo">
                                            <i class="zmdi zmdi-phone material-icons-name"></i>
                                        </label>
                                        <input type="ContactNo" name="ContactNo" id="ContactNo" autoComplete="off" placeholder="Enter phone no."></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Email">
                                            <i class="zmdi zmdi-email material-icons-name"></i>
                                        </label>
                                        <input type="Email" name="Email" id="Email" autoComplete="off" placeholder="Enter Email"></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">
                                            <i class="zmdi zmdi-lock material-icons-name"></i>
                                        </label>
                                        <input type="password" name="password" id="password" autoComplete="off" placeholder="Enter password"></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cpassword">
                                            <i class="zmdi zmdi-lock material-icons-name"></i>
                                        </label>
                                        <input type="password" name="cpassword" id="cpassword" autoComplete="off" placeholder="Reenter your password"></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="work">
                                            <i class="zmdi zmdi-slideshow material-icons-name"></i>
                                        </label>
                                        <input type="work" name="work" id="work" autoComplete="off" placeholder="Enter profession"></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Domain">
                                            <i class="zmdi zmdi-disqus material-icons-name"></i>
                                        </label>
                                        <input type="Domain" name="Domain" id="Domain" autoComplete="off" placeholder="Enter domain"></input>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="experience">
                                            <i class="zmdi zmdi-assignment-o material-icons-name"></i>
                                        </label>
                                        <input type="experience" name="experience" id="experience" autoComplete="off" placeholder="Enter experience in domain"></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
};

export default Signup;