import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps, Section } from '@/types'
import { Head } from '@inertiajs/react'

import { FileAddOutlined, LikeOutlined, 
    DeleteOutlined, EditOutlined, 
	EyeInvisibleOutlined,EyeTwoTone,
    QuestionCircleOutlined } from '@ant-design/icons';

import { App, Card, Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox } from 'antd';

import React, { useEffect, useState } from 'react'
import axios from 'axios';


const { Column } = Table;
const { Search } = Input;

export default function AdminSectionIndex({ auth, permissions }: PageProps<{permissions:string[]}>) {
	
	const [form] = Form.useForm();

    const [data, setData] = useState<Section[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [open, setOpen] = useState(false); //for modal

	const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [sortBy, setSortBy] = useState<any>('id.desc');

    const [id, setId] = useState(0);
	const { notification } = App.useApp();

	interface PaginateResponse {
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
			const res = await axios.get<PaginateResponse>(`/admin/get-sections?${params}`);
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



	const getData = async (id:number) => {
		try{
			const res = await axios.get<Section>(`/admin/sections/${id}`);
			form.setFields([
				{ name: 'title', value: res.data.section },
				{ name: 'active', value: res.data.active ? true : false },
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
		setErrors({})
		setId(id);
        setOpen(true);
        getData(id);
	}

	const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/admin/sections/' +id);
		if(res.data.status === 'deleted'){
            notification.info({
                message: 'Deleted',
                description: 'Section successfully deleted.',
                placement: 'bottomRight',
            });

			loadAsync()
		}
	}
	

	const onFinish = async (values:Section) =>{
		console.log(id);
		
		if(id > 0){
			try{
				const res = await axios.put('/admin/sections/' + id, values)
				if(res.data.status === 'updated'){
                    notification.info({
                        message: 'Updated!',
                        description: 'Section successfully update.',
                        placement: 'bottomRight',
                    });
        
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
				const res = await axios.post('/admin/sections', values)
				if(res.data.status === 'saved'){
                    notification.info({
                        message: 'Saved!',
                        description: 'Category successfully save.',
                        placement: 'bottomRight',
                    });
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
			<Head title="Section Management"></Head>

			<div className='flex mt-10 justify-center items-center'>

				{/* card */}
				<div className='p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md
					md:w-[740px]
					sm:w-[740px]'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF SECTIONS</div>
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
						
						<div className='flex flex-end my-4'>
							<Button className='ml-auto' 
								icon={<FileAddOutlined />} 
								type="primary" onClick={handClickNew}>
								New
							</Button>     
						</div>
						
						<Table dataSource={data}
							loading={loading}
							rowKey={(data) => data.id}
							pagination={false}>

							<Column title="Id" dataIndex="id"/>
							<Column title="Section" dataIndex="section" key="section"/>
							<Column title="Active" dataIndex="active" key="active" render={(active)=>(
								active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>
							
							<Column title="Action" key="action" 
								render={(_, data:Section) => (
									<Space size="small">
										<Button shape="circle" icon={<EditOutlined/>} onClick={ ()=> handleEditClick(data.id) } />
										
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
                title="CATEGORY INFORMATION"
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
							section: '',
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
                    name="section"
                    label="Section"
                    validateStatus={errors.title ? 'error' : ''}
                    help={errors.title ? errors.title[0] : ''}
                >
                    <Input placeholder="Category"/>
                </Form.Item>

                <Form.Item
                    name="active"
                    valuePropName="checked"
                >
                    <Checkbox>Active</Checkbox>
                </Form.Item>
                
            </Modal>

		</Authenticated>
	)
}
