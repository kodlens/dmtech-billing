import AdminLayout from '@/Layouts/AdminLayout'
import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'
import { App, Button, Checkbox, DatePicker, Form, Input, InputNumber, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SaveOutlined } from "@ant-design/icons";


import dayjs from "dayjs";

const dateFormat = (item: string): string => {
    return dayjs(item).format("MMM-DD-YYYY");
};


export default function AdminConsumerAddEdit( 
    {
        auth, id, user 
    }
    : {
        auth:PageProps, id:number, user: User
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
                        content: <div>Featured video successfully updated.</div>,
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
                        content: <div>Featured video successfully saved.</div>,
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
                { name: 'account_no', value: user.account_no },
                { name: 'lname', value: user.lname },
                { name: 'fname', value: user.fname },
                { name: 'mname', value: user.mname },
                { name: 'email', value: user.email },
                { name: 'sex', value: user.sex },
                { name: 'role', value: user.role },
                { name: 'due_date', value: user.due_date },
                { name: 'address', value: user.address },
                {
                    name: "date_connected",
                    value:
                        user.date_connected &&
                        dayjs(user?.date_connected),
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
					<div className="font-bold mb-4 text-lg">ADD/EDIT CONSUMER/CLIENT INFORMATION</div>

                    {/* card body */}
                    <div>

                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
                        autoComplete="off"
                        initialValues={{
                            account_no: "", lname:'', fname:'', mname:'',email: "",
                            name: "", sex: "",role: "", date_connected: null, due_date: 0,
                            active: true,
                        }}
                        clearOnDestroy
                        onFinish={(values) => submit(values)}>
                        
                    
                        <Form.Item name="account_no" label="Account No. (Read Only)"
                            validateStatus={errors.account_no ? "error" : ""}
                            help={errors.account_no ? errors.account_no[0] : ""}>
                            <Input placeholder="Account No." readOnly />
                        </Form.Item>


                        <Form.Item name="lname" label="Last Name"
                            validateStatus={errors.lname ? "error" : ""}
                            help={errors.lname ? errors.lname[0] : ""}
                        >
                            <Input placeholder="Last Name" />
                        </Form.Item>

                        <Form.Item
                            name="fname"
                            label="First Name"
                            validateStatus={errors.fname ? "error" : ""}
                            help={errors.fname ? errors.fname[0] : ""}
                        >
                            <Input placeholder="First Name" />
                        </Form.Item>

                        <Form.Item
                            name="mname"
                            label="Middle Name"
                            validateStatus={errors.mname ? "error" : ""}
                            help={errors.mname ? errors.mname[0] : ""}
                        >
                            <Input placeholder="FiMiddlerst Name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            validateStatus={errors.email ? "error" : ""}
                            help={errors.email ? errors.email[0] : ""}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Address"
                        
                            validateStatus={errors.address ? "error" : ""}
                            help={errors.address ? errors.address[0] : ""}
                        >
                            <Input.TextArea rows={6} placeholder="Address" />
                        </Form.Item>

                        <div className="flex gap-4">
                            <Form.Item
                                name="sex"
                                label="Sex"
                                className="w-full"
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

                        <div className="flex gap-4">
                            <Form.Item
                                name="publication_date"
                                label="Date Publish"
                                className="w-full"
                                validateStatus={
                                    errors.publication_date ? "error" : ""
                                }
                                help={
                                    errors.publication_date
                                        ? errors.publication_date[0]
                                        : ""
                                }
                            >
                                <DatePicker className="w-full" />
                            </Form.Item>

                            

                            <Form.Item
                                name="due_date"
                                label="Due Date"
                                className="w-full"
                                validateStatus={errors.due_date ? "error" : ""}
                                help={errors.due_date ? errors.due_date[0] : ""}
                            >
                            <InputNumber />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="active"
                            valuePropName="checked"
                            className="w-full"
                            label="Featured"
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

                    </Form>
                        
                    </div>
                </div>
                {/* card */}

            </div>
        </AdminLayout>
    )
}
