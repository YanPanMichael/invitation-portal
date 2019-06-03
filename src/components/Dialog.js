import React from "react";
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
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Request an invite"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
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
                    required: true,
                    message: "Please input your E-mail!",
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
              })(<Input onBlur={this.handleConfirmBlur} placeholder="Confirm E-mail" />)}
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
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          New Collection
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;
