import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Pagination } from 'antd';
import './style.css';

const AdminCard = ({
  imgUrl,
  name,
  description,
  githbUrl,
  student,
  websiteLink,
  studentNames,
  ComProject,
  CliProject,
  editCard,
  deleteCard,
}) => {
  return (
    <>
      <section className="card-container">
        <ul>
          <li>
            <div className="name-img-card">
              <div className="img-card">
                <img src={imgUrl} alt="card" />
              </div>
              <div>
                <h3>Name</h3>
                <p>{name}</p>
              </div>
            </div>
            {description && (
              <div>
                <h3>Description</h3>
                <p>{description}</p>
              </div>
            )}
            <div>
              <h3>Github link</h3>
              <NavLink exact to={githbUrl}>
                Click
              </NavLink>
            </div>
            {student && (
              <div>
                <h3>Student</h3>
                <NavLink exact to="/admin/students">
                  View
                </NavLink>
              </div>
            )}
            {websiteLink && (
              <div>
                <h3>Website</h3>
                <NavLink exact to={websiteLink}>
                  View
                </NavLink>
              </div>
            )}
            {studentNames && (
              <div>
                <h3>Student</h3>
                <p>{studentNames}</p>
              </div>
            )}
            {ComProject && (
              <div>
                <h3>Community p</h3>
                <NavLink exact to="/admin/projects?type=internal">
                  View
                </NavLink>
              </div>
            )}
            {CliProject && (
              <div>
                <h3>Clients p</h3>
                <NavLink exact to="/admin/projects?type=remotely">
                  View
                </NavLink>
              </div>
            )}
            <div>
              <Button onClick={editCard} className="card-btn edit">
                Edit
              </Button>
              <Button onClick={deleteCard} className="card-btn">
                Delete
              </Button>
            </div>
          </li>
        </ul>
      </section>
      <section className="pagination">
        <Pagination defaultCurrent={1} total={50} />
      </section>
    </>
  );
};

AdminCard.defaultProps = {
  description: undefined,
  studentNames: undefined,
  websiteLink: undefined,
  student: undefined,
  ComProject: undefined,
  CliProject: undefined,
};

AdminCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  name: PropTypes.func.isRequired,
  description: PropTypes.string,
  githbUrl: PropTypes.string.isRequired,
  websiteLink: PropTypes.string,
  student: PropTypes.string,
  studentNames: PropTypes.string,
  ComProject: PropTypes.string,
  CliProject: PropTypes.string,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default AdminCard;
