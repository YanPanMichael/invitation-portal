import React from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Radio } from "antd";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      confirmDirty: false
    };

    compareToFirstEmail = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue("email")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    };

    validateToNextEmail = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    };

    handleConfirmBlur = e => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render() {
      const { visible, onCreate, onCancel, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Request an invite"
          style={{ textAlign: "center" }}
          centered
          // onOk={onCreate}
          onCancel={onCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => onCreate()}
              block
            >
              Send
            </Button>
          ]}
        >
          <Form layout="vertical" style={{ paddingTop: 20 }}>
            <Form.Item>
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your full name!",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Full Name" />)}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  },
                  {
                    validator: this.validateToNextEmail
                  }
                ]
              })(<Input placeholder="E-mail" />)}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    type: "email",
                    required: true,
                    message: "Please confirm your E-mail!"
                  },
                  {
                    validator: this.compareToFirstEmail
                  }
                ]
              })(
                <Input
                  onBlur={this.handleConfirmBlur}
                  placeholder="Confirm E-mail"
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

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

      this.sendRequest(values).then(res => {
        if (res.status === 200 && res.data === "Registered") {
          console.log('aa', res.data);
        } else {
          alert("Registered Failed!")
        }
      }).catch(err => {
        console.log('axios', err);
        window.alert("Opps, please change email address and try again!");
      });

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  sendRequest(values) {
    const reqUrl = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
    return axios({
      method: 'post',
      url: reqUrl,
      data: {
        name: values.name,
        email: values.email
      }
    }).then(res => res);
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
