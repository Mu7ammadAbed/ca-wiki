import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { notification, Modal, Empty, List, Pagination, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import AdminContainer from '../../components/AdminContainer';
import AdminCard from '../../components/AdminCard';

const { confirm } = Modal;

class Student extends Component {
  state = {
    data: [],
    startPage: 0,
    endPage: 4,
    total: 5,
    currentPage: 1,
    loading: true,
  };

  async componentDidMount() {
    const {
      match: {
        params: { cohortId },
      },
    } = this.props;
    try {
      const res = await axios.get(`/api/v1/cohorts/${cohortId}/alumni`);
      const { data } = res.data;
      this.setState({ data, total: data.length * 2.5, loading: false });
    } catch (err) {
      notification.error({
        message: 'Internal Server Error',
        description: err.message,
      });
    }
  }

  deleteStudent = (id, name) => {
    confirm({
      title: 'Are you sure you want to delete this Student ?',
      icon: <ExclamationCircleOutlined />,
      content: `Student ID: ${id}, Name: ${name}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const result = await axios.delete(`/api/v1/alumni/${id}`);
          const { data } = this.state;
          this.setState({
            data: data.filter((student) => student.id !== id),
            total: data.length * 2.5 - 4,
          });
          const {
            data: {
              data: { message },
            },
          } = result;
          notification.success({
            message: 'Student deleted successfully',
            description: message,
          });
        } catch (err) {
          const {
            response: {
              data: { message },
            },
          } = err;
          notification.error({
            message: 'Error 401 Un-Authorized',
            description: message,
          });
        }
      },
    });
  };

  render() {
    const {
      match: {
        params: { cohortId },
      },
    } = this.props;
    const {
      data,
      startPage,
      endPage,
      total,
      currentPage,
      loading,
    } = this.state;
    const list = data.slice(startPage, endPage);
    return (
      <div>
        <AdminContainer
          buttonContent="Add Student"
          buttonRoute={`/admin/cohorts/${cohortId}/students/add`}
        >
          {loading && data.length === 0 ? (
            <Spin size="large" />
          ) : !loading && data.length === 0 ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="empty" />
          ) : (
            <div>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                  <List.Item className="admin-list-card">
                    <AdminCard
                      key={item.id}
                      name={item.name}
                      email={item.email}
                      imgUrl={item.img_url}
                      githbUrl={item.github_link}
                      studentId={item.id}
                      cohortId={item.cohortId}
                      editCard={`/admin/cohorts/${cohortId}/students/${item.id}/edit`}
                      deleteCard={this.deleteStudent}
                      type="admin-cohort-student"
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
            </div>
          )}
        </AdminContainer>
      </div>
    );
  }
}

Student.defaultProps = {
  cohortId: undefined,
  match: undefined,
  params: undefined,
};

Student.propTypes = {
  cohortId: PropTypes.number,
  match: PropTypes.node,
  params: PropTypes.node,
};

export default Student;
