import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Role, PageProps } from '@/types'
import { Head } from '@inertiajs/react'

import { FileAddOutlined,
    DeleteOutlined, EditOutlined, 
    QuestionCircleOutlined } from '@ant-design/icons';

import { Card, Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
    notification } from 'antd';


import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { NotificationPlacement } from 'antd/es/notification/interface';


const { Column } = Table;
const { Search } = Input;

export default function RoleIndex({ auth, permissions }: PageProps<{permissions:string[]}>) {
	
	const [form] = Form.useForm();

    const [data, setData] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal

	const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [sortBy, setSortBy] = useState<any>('id.desc');

    const [id, setId] = useState(0);
		
	interface AxiosResponse {
		data: any[];
		total: number;
	}

	const loadAsync = async () => {

        setLoading(true)
        const params = [
			`search=${search}`,
            `perpage=${perPage}`,
            `sort_by=${sortBy}`,
            `page=${page}`
        ].join('&');

		try{
			const res = await axios.get<AxiosResponse>(`/panel/get-roles?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
			setLoading(false)
		}catch(err){
			setLoading(false)
		}
    }

    useEffect(()=>{
        loadAsync()
    },[perPage, page])


    const onPageChange = (index:number, perPage:number) => {
        setPage(index)
        setPerPage(perPage)
    }


	// this for notifcation
	const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement:NotificationPlacement, title:string, msg:string) => {
        api.info({
            message: title,
            description: msg,
            placement,
        });
    };


	const getData = async (id:number) => {
		try{
			const res = await axios.get<Role>(`/panel/roles/${id}`);
			form.setFields([
				{ name: 'role', value: res.data.role },
				{ name: 'guard_name', value: res.data.guard_name },
			]);
		}catch(err){
            console.log(err);
		}
    }


	const handClickNew = () => {
        //router.visit('/');
		setId(0)
        setOpen(true)
    }

	const handleEditClick = (id:number) => {
		setErrors({})
		setId(id);
        setOpen(true);
        getData(id);
	}

	const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/panel/roles/' +id);
		if(res.data.status === 'deleted'){
			openNotification('bottomRight', 'Deleted!', 'Role successfully deleted.')
			loadAsync()
		}
	}
	

	const onFinish = async (values:Role) =>{
		console.log(id);
		
		if(id > 0){
			try{
				const res = await axios.put('/panel/roles/' + id, values)
				if(res.data.status === 'updated'){
					openNotification('bottomRight', 'Updated!', 'Role successfully update.')
					setOpen(false)
					loadAsync()
				}
			}catch(err:any){
				if(err.response.status === 422){
					setErrors(err.response.data.errors)
				}
			}
		}else{
			try{
				const res = await axios.post('/panel/roles', values)
				if(res.data.status === 'saved'){
					openNotification('bottomRight', 'Saved!', 'Role successfully save.')
					setOpen(false)
					loadAsync()
				}
			}catch(err:any){
				if(err.response.status === 422){
					setErrors(err.response.data.errors)

				}
			}
		}
		

		//throw new Error('Function not implemented.');
	}

	return (
		<Authenticated user={auth.user}>
			<Head title="Role Management"></Head>

			{contextHolder}

			<div className='flex mt-10 justify-center items-center'>

				{/* card */}
				<div className='p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md
					md:w-[900px]
					sm:w-[740px]'>
					{/* card header */}
					<div className="font-bold mb-4">List of Role</div>
					{/* card body */}
					<div>
						<div className='mb-2'>
							<Search placeholder="Search..." 
								autoComplete='off'
								enterButton="Search"
								size="large"
								id="search"
								onChange={(e) => setSearch(e.target.value)}
								loading={loading}
								onSearch={loadAsync} />
						</div>
						{ permissions.includes('roles.create') && (
							<div className='flex flex-end my-4'>
								<Button className='ml-auto' 
									icon={<FileAddOutlined />} 
									type="primary" onClick={handClickNew}>
									New
								</Button>     
							</div>
						)}
						<Table dataSource={data}
							loading={loading}
							rowKey={(data) => data.id}
							pagination={false}>

							<Column title="Id" dataIndex="id"/>
							<Column title="Role" dataIndex="role" key="role"/>
							<Column title="Description" dataIndex="guard_name" key="description"/>
							
							<Column title="Action" key="action" 
								render={(_, data:Role) => (
									<Space size="small">
										{ permissions.includes('roles.edit') && (
											<Button shape="circle" icon={<EditOutlined/>} onClick={ ()=> handleEditClick(data.id) } />
										)}
										
										{ permissions.includes('roles.destroy') && (
											<Button danger shape="circle"
												onClick={()=> (
													Modal.confirm({
														title: 'Delete?',
														icon: <QuestionCircleOutlined />,
														content: 'Are you sure you want to delete this data?',
														okText: 'Yes',
														cancelText: 'No',
														onOk() {
															handleDeleteClick(data.id) 
														}
													})
												)}
												icon={<DeleteOutlined/>} />
										)}
									</Space>
								)}
							/>
						</Table>

						<Pagination className='mt-4' 
							onChange={onPageChange}
							pageSize={5}
							defaultCurrent={1} 
							total={total} />
						
					</div>
				</div>
				{/* card */}

			</div>


			{/* Modal with Cancel and Save button*/}
			<Modal
                open={open}
                title="ROLE INFORMATION"
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                onCancel={() => setOpen(false)}
                destroyOnClose
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
						autoComplete='off'
                        initialValues={{
							role: '',
							guard_name: '',
                        }}
                        clearOnDestroy
                        onFinish={(values) => onFinish(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="role"
                    label="Role"
                    validateStatus={errors.role ? 'error' : ''}
                    help={errors.role ? errors.role[0] : ''}
                >
                    <Input placeholder="Role"/>
                </Form.Item>
                
            </Modal>

		</Authenticated>
	)
}
