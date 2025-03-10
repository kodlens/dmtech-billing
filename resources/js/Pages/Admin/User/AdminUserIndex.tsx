import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps, User } from '@/types'
import { Head } from '@inertiajs/react'

import { FileAddOutlined, LikeOutlined, 
    DeleteOutlined, EditOutlined, 
	EyeInvisibleOutlined,EyeTwoTone,
    QuestionCircleOutlined } from '@ant-design/icons';

import { Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
	App, 
    DatePicker} from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ChangePassword from './partials/ChangePassword';

const { Column } = Table;


export default function AdminUserIndex({ auth }: PageProps) {
	
	const [form] = Form.useForm();

	const  { notification } = App.useApp();

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal
	const [passwordVisible, setPasswordVisible] = React.useState(false);

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [id, setId] = useState(0);
	

	interface PaginateResponse {
		data: User[],
		total: number;
	}

	const loadDataAsync = async () => {

        setLoading(true)
        const params = [
            `perpage=${perPage}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/admin/get-users?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
			setLoading(false)
		}catch(err){
			console.log(err)
		}
    }

    useEffect(()=>{
        loadDataAsync()
    },[perPage, search, page])


    const onPageChange = (index:number, perPage:number) => {
        setPage(index)
        setPerPage(perPage)
    }


	const getUser = async (dataId:number) => {
		try{
			const response = await axios.get<User>(`/admin/users/${dataId}`);
			form.setFields([
				{ name: 'username', value: response.data.username },
				{ name: 'lname', value: response.data.lname },
				{ name: 'fname', value: response.data.fname },
				{ name: 'mname', value: response.data.mname },
				{ name: 'email', value: response.data.email },
				{ name: 'sex', value: response.data.sex },
				{ name: 'role', value: response.data.role }
			]);
		}catch(err){
		}
    }

	const handClickNew = () => {
        //router.visit('/');
		setId(0)
        setOpen(true)
    }

	const handleEditClick = (id:number) => {
		setId(id);
        setOpen(true);
        getUser(id);
	}

	const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/admin/users/{id}');
		if(res.data.status === 'deleted'){
			loadDataAsync()
		}
	}
	

	const onFinish = async (values:User) =>{

		if(id > 0){
			try{
				const res = await axios.put('/admin/users/' + id, values)
				if(res.data.status === 'updated'){
					notification.info({ placement: 'bottomRight', message: 'Updated!', description: 'User successfully updated.'})
					setOpen(false)
					loadDataAsync()
				}
			}catch(err:any){
				if(err.response.status === 422){
	
				}
			}
		}else{
			try{
				const res = await axios.post('/admin/users', values)
				if(res.data.status === 'saved'){
					notification.info({ placement: 'bottomRight', message: 'Saved!', description: 'User successfully saved.'})
					setOpen(false)
					loadDataAsync()
				}
			}catch(err:any){
				if(err.response.status === 422){
	
				}
			}
		}
	}

	return (
		<AuthenticatedLayout user={auth.user}>
            
			<Head title="User Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full mx-2 bg-white shadow-sm rounded-md
					sm:w-[640px]
					md:w-[990px]'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF USER</div>
					{/* card body */}
					<div>
						<Table dataSource={data}
							loading={loading}
							rowKey={(data) => data.id}
							pagination={false}>

							<Column title="Id" dataIndex="id" key="id"/>
							<Column title="Username" dataIndex="username" key="username"/>
							<Column title="Last Name" key="lname" dataIndex="lname"/>
							<Column title="First Name" key="fname" dataIndex="fname"/>
							<Column title="Middle Name" key="mname" dataIndex="mname"/>
							<Column title="Email" dataIndex="email" key="email"/>
							<Column title="Role" dataIndex="role" key="role"/>
							<Column title="Active" dataIndex="active" key="active" render={(active)=>(
								active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
							<Column title="Action" key="action" 
								render={(_, data:User) => (
									<Space size="small">
										<Button shape="circle" icon={<EditOutlined/>} 
											onClick={ ()=> handleEditClick(data.id) } />
										<ChangePassword data={data} onSuccess={loadDataAsync}/>
									</Space>
								)}
							/>
						</Table>

						<Pagination className='mt-4' 
							onChange={onPageChange}
							defaultCurrent={1} 
							total={total} />

						<div className='flex flex-end mt-2'>
							<Button className='ml-auto' 
								icon={<FileAddOutlined />} 
								type="primary" onClick={handClickNew}>
								New
							</Button>     
						</div>
					</div>
				</div>
				{/* card */}
			</div>


			{/* Modal */}
            <Modal
                open={open}
                title="USER INFORMATION"
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: "submit",
                }}
                onCancel={() => setOpen(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
                        autoComplete="off"
                        initialValues={{
                            username: "",
                            password: "",
                            email: "",
                            name: "",
                            sex: "",
                            role: "",
                            active: true,
                        }}
                        clearOnDestroy
                        onFinish={(values) => onFinish(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    validateStatus={errors.username ? "error" : ""}
                    help={errors.username ? errors.username[0] : ""}
                >
                    <Input placeholder="Username" />
                </Form.Item>

                {id < 1 ? (
                    <>
                        <Form.Item
                            name="password"
                            label="Password"
                            validateStatus={errors.password ? "error" : ""}
                            help={errors.password ? errors.password[0] : ""}
                        >
                            <Input.Password
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                placeholder="Re-type Password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password_confirmation"
                            label="Re-type Password"
                            validateStatus={
                                errors.password_confirmation ? "error" : ""
                            }
                            help={
                                errors.password_confirmation
                                    ? errors.password_confirmation[0]
                                    : ""
                            }
                        >
                            <Input.Password
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                                placeholder="Re-type Password"
                            />
                        </Form.Item>
                    </>
                ) : (
                    ""
                )}

                <Form.Item
                    name="lname"
                    label="Last Name"
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

                    

                    <Form.Item
                        name="role"
                        label="Role"
                        className="w-full"
                        validateStatus={errors.role ? "error" : ""}
                        help={errors.role ? errors.role[0] : ""}
                    >
                        <Select
                            options={[
                                { value: "USER", label: "USER" },
                                { value: "STAFF", label: "STAFF" },
                                { value: "ADMINISTRATOR", label: "ADMINISTRATOR" },
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
                      <Input />
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

            </Modal>


		</AuthenticatedLayout>
	)
}
