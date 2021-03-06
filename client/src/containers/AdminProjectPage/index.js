import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { notification, Empty, List, Pagination, Modal, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AdminCard from '../../components/AdminCard';
import AdminContainer from '../../components/AdminContainer';

const { confirm } = Modal;

class AdminProject extends Component {
  state = {
    data: [],
    startPage: 0,
    endPage: 4,
    total: 0,
    currentPage: 1,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        match: {
          params: { cohortId },
        },
      } = this.props;
      const {
        location: { search },
      } = this.props;
      const res = await axios.get(
        `/api/v1/cohorts/${cohortId}/projects${search}`
      );
      const { data } = res.data;
      const total = data.length * 2.5;
      this.setState({ data, total, loading: false });
    } catch (err) {
      const {
        response: {
          data: { message },
        },
      } = err;
      notification.error({
        message: 'Error',
        description: message,
      });
    }
  }

  deleteProject = (id) => {
    confirm({
      title: 'Delete confirmation',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure delete this project?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const res = await axios.delete(`/api/v1/projects/${id}`);
          const { data } = this.state;
          this.setState({
            data: data.filter((project) => project.id !== id),
            total: data.length * 2.5 - 4,
          });
          const {
            data: { message },
          } = res;
          notification.success({
            message: 'Success',
            description: message,
          });
        } catch (err) {
          const {
            response: {
              data: { message },
            },
          } = err;
          notification.error({
            message: 'Error',
            description: message,
          });
        }
      },
    });
  };

  render() {
    const {
      data,
      total,
      startPage,
      endPage,
      currentPage,
      loading,
    } = this.state;
    const {
      match: {
        params: { cohortId },
      },
      history: {
        location: { search },
      },
    } = this.props;
    const dataList = data.slice(startPage, endPage);
    const projectType = search.split('=')[1];
    return (
      <div className="App">
        <AdminContainer
          buttonContent="Add Project"
          buttonRoute={`/admin/cohorts/${cohortId}/projects/add/${projectType}`}
        >
          {loading && data.length === 0 ? (
            <Spin size="large" />
          ) : !loading && data.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            <>
              <List
                dataSource={dataList}
                renderItem={(item) => (
                  <List.Item key={item.id} className="admin-list-card">
                    <AdminCard
                      imgUrl={item.img_url}
                      name={item.name}
                      description={item.description}
                      githbUrl={item.github_link}
                      websiteLink={item.website_link}
                      projectId={item.id}
                      editCard={`/admin/cohorts/${cohortId}/projects/${item.id}/edit`}
                      deleteCard={this.deleteProject}
                      type="admin-cohort-page"
                    />
                  </List.Item>
                )}
              />
              <Pagination
                className="pagination"
                current={currentPage}
                defaultCurrent={1}
                showQuickJumper
                onChange={(page) => {
                  this.setState({
                    currentPage: page,
                    startPage: page * 4 - 4,
                    endPage: page * 4,
                  });
                }}
                total={total}
              />
            </>
          )}
        </AdminContainer>
      </div>
    );
  }
}

AdminProject.propTypes = {
  cohortId: PropTypes.number.isRequired,
  match: PropTypes.func.isRequired,
  location: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }).isRequired,
};

export default AdminProject;
