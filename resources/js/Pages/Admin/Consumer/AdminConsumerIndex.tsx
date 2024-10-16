import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps, User } from '@/types'
import { Head, router } from '@inertiajs/react'

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


const { Column } = Table;


export default function AdminConsumerIndex({ auth }: PageProps) {

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
			const res = await axios.get<PaginateResponse>(`/admin/get-consumers?${params}`);
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

	const handClickNew = () => {
        router.visit('/admin/consumers/create');
    }

	const handleEditClick = (id:number) => {
		router.visit('/admin/consumers/' + id + '/edit')
	}

	const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/admin/consumers/{id}');
		if(res.data.status === 'deleted'){
			loadDataAsync()
		}
	}


	const onFinish = async (values:User) =>{

		if(id > 0){
			try{
				const res = await axios.put('/admin/consumers/' + id, values)
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
				const res = await axios.post('/admin/consumers', values)
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

			<Head title="Consumer Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full mx-2 bg-white shadow-sm rounded-md
					sm:w-[640px]
					md:w-[990px]'>
					{/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF CONSUMERS/CLIENTS</div>
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

		</AuthenticatedLayout>
	)
}
