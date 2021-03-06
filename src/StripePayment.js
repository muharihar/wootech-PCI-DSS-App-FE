import * as React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import CreditCard from "./CreditCard";
import NumericInput from "./NumericInput";
import Security from "./Security";
import Amount from "./Amount";
import ExpiryDate from "./ExpiryDate";
import { DatePicker, } from 'antd';
import { loadReCaptcha } from "react-recaptcha-google";
import DocumentTitle from "react-document-title";
import { injectStripe, ReactStripeElements } from "react-stripe-elements";
import { Form, Input, Select, Button, AutoComplete, Checkbox } from "antd";
import { Layout } from "antd";
import PhoneNumber from "./PhoneNumber";
{
  /*
  Project : WooTech PCI-DSS Compliant App
  Team: Front-End
  Owner: Surabhi Malani
  Background Image is © SURABHI MALANI (500PX)
*/
}
const { Header, Footer, Content } = Layout;
const { MonthPicker } = DatePicker;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

// const residences = [
//   {
//     value: "zhejiang",
//     label: "Zhejiang",
//     children: [
//       {
//         value: "hangzhou",
//         label: "Hangzhou",
//         children: [
//           {
//             value: "xihu",
//             label: "West Lake"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     value: "jiangsu",
//     label: "Jiangsu",
//     children: [
//       {
//         value: "nanjing",
//         label: "Nanjing",
//         children: [
//           {
//             value: "zhonghuamen",
//             label: "Zhong Hua Men"
//           }f
//         ]
//       }
//     ]
//   }
// ];

class StripePayment extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    
  };

  constructor(props) {
    super(props);
    this.state = {
      name_on_card: "",
      listDataFromChild: null,
      checked: true,
      phoneNewNumber: null,
    };
  }
  myCallback = dataFromChild => {
    console.log("Before delay: " + dataFromChild);
    this.setState({ listDataFromChild: dataFromChild });
  };
  myPhoneNumberCallback = dataFromChild => {
    console.log("Before delay: " + dataFromChild);
    this.setState({ phoneNewNumber: dataFromChild });
  };
  componentDidMount() {
    loadReCaptcha();
  }
  onChange = value => {
    this.setState({ value });
  };
  handleCreditCardChange = value => {
    console.log("Credit Card: " + this.state.listDataFromChild);
    this.props.form.setFieldsValue({
      card: this.state.listDataFromChild
    });
    console.log(this.props.form.getFieldValue("card"))
  };
  handlePhoneNumberChange = value => {
    console.log("Credit Card: " + this.state.phoneNewNumber);
    this.props.form.setFieldsValue({
      phoneNew: this.state.phoneNewNumber
    });
    console.log(this.props.form.getFieldValue("phoneNew"))
    //console.log(this.props.form.getFieldValue("expiry").format('YYYY-MM'))
    
  };
   //handleSubmit = async  (e) => {
  // async handleSubmit(e) {
  handleSubmit = e => {
  
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      //console.log(this.props.form.getFieldValue("expiry").format('YYYY-MM'))
      
      if (!err) {
        console.log("Received values of form: ", fieldValues);
        this.props.callbackFromParent(fieldValues); //callback function
        
      }
    });
  };
/*
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };
  */
  toggleChecked = () => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "86"
    })(
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
        <Option value="65">+65</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    // const websiteOptions = autoCompleteResult.map(website => (
    //   <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    // ));

    return (
      <Form
        className="form-color"
        {...formItemLayout}
        onSubmit={this.handleSubmit}
      >
        <br />
        <Form.Item label="FirstName">
          {getFieldDecorator("first_name", {
            rules: [
              {
                required: true,
                message: "Please input your first name!"
              }
            ]
          })(<Input style={{ width: 300 }} />)}
        </Form.Item>
        <Form.Item label="LastName">
          {getFieldDecorator("last_name", {
            rules: [
              {
                required: true,
                message: "Please input your last name!"
              }
            ]
          })(<Input style={{ width: 300 }} />)}
        </Form.Item>
        {/*
        <Form.Item label=" ">
          <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">MasterCard</Radio.Button>
            <Radio.Button value="b">Visa</Radio.Button>
            <Radio.Button value="c">American Express</Radio.Button>
            <Radio.Button value="d">Discover</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Select" hasFeedback>
          {getFieldDecorator("select", {
            rules: [
              { required: true, message: "Please select your payment type!" }
            ]
          })(
            <Select placeholder="Please select your payment tpe">
              <Option value="MasterCard">MasterCard</Option>
              <Option value="Visa">Visa</Option>
              <Option value="American Express">American Express</Option>
              <Option value="Discover">Discover</Option>
            </Select>
          )}
        </Form.Item>
          */}
        <Form.Item label="Amount Payable">
          {getFieldDecorator("amount", {
            rules: [
              {
                required: true,
                message: "Please input the amount payable !"
              }
            ]
          })(<Amount />)}
        </Form.Item>
        <Form.Item label="Name On Card">
          {getFieldDecorator("name_on_card", {
            rules: [
              {
                required: true,
                message: "Please input the name on your card !"
              }
            ]
          })(<Input style={{ width: 400 }} />)}
        </Form.Item>
        <Form.Item label="Card Number">
          {getFieldDecorator("card", {
            rules: [
              {
                required: true,
                message: "Please input your card number !"
              }
            ]
          })(<CreditCard callbackFromParent={this.myCallback} />)}
        </Form.Item>

        <Form.Item label="Expiration">
          {getFieldDecorator("expiry", {
            rules: [
              {
                required: true,
                message: "Please input your expiration date !"
              }
            ]
          })(<MonthPicker style={{ width: 100}}  placeholder = ""/>)}
        </Form.Item>
        <Form.Item label="CVV">
          {getFieldDecorator("cvv", {
            rules: [
              {
                required: true,
                message: "Please input your security number !"
              }
            ]
          })(
            <NumericInput
              style={{ width: 120 }}
              value={this.state.value}
              onChange={this.onChange}
              which={4}
            />
          )}
        </Form.Item>
        <Form.Item label="Billing Address 1">
          {getFieldDecorator("address1", {
            rules: [
              {
                required: true,
                message: "Please input your billing address !"
              }
            ]
          })(<Input onChange = {this.handleCreditCardChange} />)}
        </Form.Item>
        <Form.Item label="Billing Address 2">
          {getFieldDecorator("address2", {})(<Input />)}
        </Form.Item>
        <Form.Item label="Billing Address Country">
          {getFieldDecorator("country", {
            rules: [
              {
                required: true,
                message: "Please input your country !"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Billing Address Zipcode">
          {getFieldDecorator("zipcode", {
            rules: [
              {
                required: true,
                message: "Please input your billing zipcode !"
              }
            ]
          })(
            <NumericInput
              style={{ width: 120 }}
              value={this.state.value}
              onChange={this.onChange}
              which={10}
            />
          )}
        </Form.Item>
        <Form.Item label=" ">
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true,
          })(
            <Checkbox
              checked={this.state.checked}
              disabled={this.state.disabled}
              onClick={this.toggleChecked}
              style={{ color: "white" }}
            >
              Shipping Address is the same as Billing Address
            </Checkbox>
          )}
        </Form.Item>
        {this.state.checked
          ? console.log("checked")
          : (console.log("unchecked"),
            (
              <div>
                <Form.Item label="Shipping Address 1">
                  {getFieldDecorator("shipaddress1", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your shipping address !"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Shipping Address 2">
                  {getFieldDecorator("shipaddress2", {})(<Input />)}
                </Form.Item>
                <Form.Item label="Shipping Address Country">
                  {getFieldDecorator("ship_country", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your country !"
                      }
                    ]
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Shipping Address Zipcode">
                  {getFieldDecorator("ship_zipcode", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your zipcode !"
                      }
                    ]
                  })(
                    <NumericInput
                      style={{ width: 120 }}
                      value={this.state.value}
                      onChange={this.onChange}
                      which={10}
                    />
                  )}
                </Form.Item>
              </div>
            ))}
        <Form.Item label="Phone Number">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number !" }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: "100%" }} />)}
        </Form.Item>

        <Form.Item label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail !"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input onChange = {this.handlePhoneNumberChange} />)}
        </Form.Item>
        {/* <Form.Item label="Password" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!"
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item> 
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("nickname", {
            rules: [
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Habitual Residence">
          {getFieldDecorator("residence", {
            initialValue: ["zhejiang", "hangzhou", "xihu"],
            rules: [
              {
                type: "array",
                required: true,
                message: "Please select your habitual residence!"
              }
            ]
          })(<Cascader options={residences} />)}
        </Form.Item>*/}
        <Form.Item label="Captcha">
          {getFieldDecorator("captcha", {
            rules: [
              {
                required: false, //should be true
                message: "We must make sure that your are a human !"
              }
            ]
          })(
            <Security
              onloadCallback={this.onLoadRecaptcha}
              verifyCallback={this.verifyCallback}
            />
          )}
        </Form.Item>
        
        {/*
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator("agreement", {
            valuePropName: "checked"
          })(
            <Checkbox>
              I have read the <a href="www.google.com">agreement</a>
            </Checkbox>
          )}
        </Form.Item>
          */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Pay
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  StripePayment
);

// ReactDOM.render(
//   <div>
//     <DocumentTitle title="Payment Page" />,
//     <Layout>
//       <Header>Welcome</Header>
//       <Content>
//         <StripePayment />
//       </Content>
//       <Footer>Thank You</Footer>
//     </Layout>

//   </div>,

//   document.getElementById("container")
// );

// calling stripe from backend
//export default injectStripe(WrappedRegistrationForm);
export default WrappedRegistrationForm;