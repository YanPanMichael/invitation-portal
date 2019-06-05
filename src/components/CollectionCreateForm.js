import React from "react";
import { Button, Modal, Form, Input } from "antd";

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

export default CollectionCreateForm;
