import React from "react";
import { Button, Modal, message, notification } from "antd";

import CollectionCreateForm from "./CollectionCreateForm";
import sendRequest from "../utils/fetch";

class CollectionsPage extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);

      sendRequest(values).then(res => {
        if (res.status === 200 && res.data === "Registered") {
          console.log("Registered!");
          Modal.success({
            title: <h2 style={{textAlign: 'center', fontStyle: 'italic'}}>All done!</h2>,
            content: <p style={{marginLeft: '-38px', textAlign: 'center'}}>You will be one of the first to experience Brocoli & Co. when we launch</p>,
            centered: true,
            okText: "OK",
            okType: "default",
            maskClosable: true,
            icon: ''
          });
        } else {
          message.error('Registered Failed');
          notification.error({
            message: 'Registered Failed!',
            description:
            'Registered Failed! Please try again later.',
          });
        }
      }).catch(err => {
        console.log('axios', err);
        message.error('Alert! Please change email address and try to register again!');
        notification.error({
          message: 'Alert!',
          description:
            'Opps, please change email address and try to register again!',
        });
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  componentWillUnmount () {
    Modal.destroyAll();
  }

  render() {
    return (
      <div className="description">
        <div>
          <h2 className="desc-title">
            A better way to enjoy every day.
          </h2>
          <p>Be the first to know when we launch.</p>
          <Button size="large" onClick={this.showModal}>
            Request an invite
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      </div>
    );
  }
}

export default CollectionsPage;