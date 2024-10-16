import AdminLayout from '@/Layouts/AdminLayout'
import { PageProps, Consumer } from '@/types'
import { Head, router } from '@inertiajs/react'
import { App, Button, Checkbox, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ProjectOutlined, SaveOutlined } from "@ant-design/icons";


import dayjs from "dayjs";

const dateFormat = (item: string): string => {
    return dayjs(item).format("MMM-DD-YYYY");
};


export default function AdminConsumerAddEdit( 
    {
        auth, id, consumer 
    }
    : {
        auth:PageProps, id:number, consumer: Consumer
    }) {

    const [form] = Form.useForm();
    const [errors, setErrors] = useState<any>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { message, modal, notification } = App.useApp();


    const submit = async (values: object) => {
        // setLoading(true)
        //console.log(values);
        
        setErrors({});

        if (id > 0) {
            try {
                const res = await axios.patch("/admin/consumers/" + id, values);
                if (res.data.status === "updated") {
                    modal.info({
                        title: "Updated!",
                        content: <div>Consumer/Client successfully updated.</div>,
                        onOk() {
                            router.visit("/admin/consumers");
                        },
                    });
                }
            } catch (err: any) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                    // message.error(err.response.data.message);
                } else {
                    message.error(`${err}. Check your components`);
                }
                setLoading(false);
            }
        } else {
            try {
                const res = await axios.post("/admin/consumers", values);
                if (res.data.status === "saved") {
                    //openNotification('bottomRight', 'Saved!', 'Article successfully save.')
                    modal.info({
                        title: "Saved!",
                        content: <div>Consumer/Client successfully saved.</div>,
                        onOk() {
                            router.visit("/admin/consumers");
                        },
                    });
                }
            } catch (err: any) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors);
                    // message.error(err.response.data.message);
                } else {
                    message.error(`${err}. Check your components`);
                }
                setLoading(false);
            }
        }
    };

    const getData = () => {
 
        try{
            form.setFields([
                { name: 'account_no', value: consumer.account_no },
                { name: 'username', value: consumer.username },
                { name: 'account_no', value: consumer.account_no },
                { name: 'lname', value: consumer.lname },
                { name: 'fname', value: consumer.fname },
                { name: 'mname', value: consumer.mname },
                { name: 'email', value: consumer.email },
                { name: 'sex', value: consumer.sex },
                { name: 'due_date', value: consumer.due_date },
                { name: 'address', value: consumer.address },
                {
                    name: "date_connected",
                    value:
                        consumer.date_connected &&
                        dayjs(consumer?.date_connected),
                },
                
            ]);
        }catch(err){
        }
    };



    useEffect(() => {
        //loadCategories()
        if (id > 0) {
            getData();
        }
    }, []);



    return (
        <AdminLayout user={ auth.user } >
            
            <Head title="Featured Videos" />

            <div className='flex mt-10 justify-center items-center'>

                {/* card */}
                <div className='p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md
                    md:w-[900px]
                    sm:w-[740px]'>
                    {/* card header */}
					<div className="font-bold text-lg">ADD/EDIT CONSUMER/CLIENT INFORMATION</div>
					<div className="text-gray-500 mb-4 text-md">Manage your consumer information</div>

                    {/* card body */}
                    <div>

                    <Form
                        layout="vertical"
                        form={form}
                        autoComplete="off"
                        initialValues={{
                            username: '', password: '', password_confirmation:'', 
                            lname:'', fname:'', mname:'',email: '',
                            sex: '', date_connected: null, due_date: 0,
                            active: true,
                        }}
                        onFinish={submit}>


                        <div className='flex flex-col md:flex-row'>
                            { id > 0 && (
                                <Form.Item className='w-full mr-2' name="account_no" label="Account No."
                                    validateStatus={errors.account_no ? "error" : ""}
                                    help={errors.account_no ? errors.account_no[0] : ""}>
                                    <Input placeholder="Account No." readOnly />
                                </Form.Item>
                            )}

                            <Form.Item className='w-full mr-2' name="username" label="Username"
                                validateStatus={errors.username ? "error" : ""}
                                help={errors.username ? errors.username[0] : ""}>
                                <Input placeholder="Username" />
                            </Form.Item>

                            { id < 1 && (
                                <>
                                    <Form.Item className='w-full mr-2' name="password" label="Password"
                                        validateStatus={errors.password ? "error" : ""}
                                        help={errors.password ? errors.password[0] : ""}>
                                        <Input.Password placeholder="Password" />
                                    </Form.Item>

                                    <Form.Item className='w-full' name="password_confirmation" label="Retype Password"
                                        validateStatus={errors.password_confirmation ? "error" : ""}
                                        help={errors.password_confirmation ? errors.password_confirmation[0] : ""}>
                                        <Input.Password placeholder=" Retype Password" />
                                    </Form.Item>
                                </>
                            )}
                            
                        </div>
                        
                        <div className='flex'>
                           
                            <Form.Item className='w-full' name="lname" label="Last Name"
                                validateStatus={errors.lname ? "error" : ""}
                                help={errors.lname ? errors.lname[0] : ""}
                            >
                                <Input placeholder="Last Name" />
                            </Form.Item>

                        </div>

                        <div className='flex'>
                            <Form.Item className='w-full mr-2' name="fname" label="First Name"
                                validateStatus={errors.fname ? "error" : ""}
                                help={errors.fname ? errors.fname[0] : ""}>
                                <Input placeholder="First Name" />
                            </Form.Item>

                            <Form.Item className='w-full' name="mname" label="Middle Name"
                                validateStatus={errors.mname ? "error" : ""}
                                help={errors.mname ? errors.mname[0] : ""}
                            >
                                <Input placeholder="Middle Name" />
                            </Form.Item>
                        </div>

                        <div className='flex'>
                            <Form.Item className='w-full mr-2' name="email" label="Email"
                                validateStatus={errors.email ? "error" : ""}
                                help={errors.email ? errors.email[0] : ""}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item name="sex" label="Sex" className="w-full"
                                validateStatus={errors.sex ? "error" : ""}
                                help={errors.sex ? errors.sex[0] : ""}
                            >
                                <Select
                                    options={[
                                        { value: "MALE", label: "MALE" },
                                        { value: "FEMALE", label: "FEMALE" },
                                    ]}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item name="address" label="Address"
                            validateStatus={errors.address ? "error" : ""}
                            help={errors.address ? errors.address[0] : ""}
                        >
                            <Input.TextArea rows={6} placeholder="Address" />
                        </Form.Item>

                       

                        <div className="flex">
                            <Form.Item name="date_connected" label="Date Connected" className="w-full mr-2"
                                validateStatus={
                                    errors.date_connected ? "error" : ""
                                }
                                help={
                                    errors.date_connected
                                        ? errors.date_connected[0]
                                        : ""
                                }
                            >
                                <DatePicker className="w-full" />
                            </Form.Item>

                            <Form.Item name="due_date" label="Due Date" className="w-full"
                                validateStatus={errors.due_date ? "error" : ""}
                                help={errors.due_date ? errors.due_date[0] : ""}
                            >
                            <InputNumber />
                            </Form.Item>
                        </div>

                        <Form.Item name="active" valuePropName="checked" className="w-full" label=""
                            validateStatus={
                                errors.active ? "error" : ""
                            }
                            help={
                                errors.active
                                    ? errors.active[0]
                                    : ""
                            }
                        >
                            <Checkbox>Active</Checkbox>
                        </Form.Item>

                        <Button className="mt-4 ml-2" htmlType='submit' type='primary' icon={<ProjectOutlined />} loading={loading}>
                            Save
                        </Button>

                    </Form>
                        
                    </div>
                </div>
                {/* card */}

            </div>
        </AdminLayout>
    )
}
