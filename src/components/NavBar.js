import React from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService";

const NavBar = () => (
  <div>
    {authService.isLogged() && (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link to="/" className="nav-item nav-link">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/users" className="nav-item nav-link">
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <button
                class="nav-item btn btn-primary"
                onClick={authService.logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )}
  </div>
);

export default NavBar;
