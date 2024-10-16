
import { Banner, PageProps, PaginateResponse } from '@/types';
import { App, Button, Input, Pagination, Space, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


import { FileAddOutlined, 
    DeleteOutlined, EditOutlined, 
    QuestionCircleOutlined } from '@ant-design/icons';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const { Column } = Table;
const { Search } = Input;

export default function BannerIndex( { auth } : PageProps) {

    console.log('how many times this DOM rendered');

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [perPage, setPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [data, setData] = useState<Banner[]>([])

    const { notification, modal } = App.useApp();

    const loadAsync = async () => {

        setLoading(true)
        const params = [
            `search=${search}`,
            `perpage=${perPage}`,
            `page=${page}`,
            `sort_by=id.desc`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/admin/pages/get-banners?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
			setLoading(false)
		}catch(err){
			setLoading(false)
		}
    }

    const onPageChange = (index:number, perPage:number) => {
        setPage(index)
        setPerPage(perPage)
    }

    useEffect(()=>{
        loadAsync()
    },[perPage, page])

    const handClickNew = () => {
        router.visit('/admin/pages/banners/create');
    }
    const handleEditClick = (id:number) => {
        router.visit('/admin/pages/banners/' + id + '/edit');
    }
    


    const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/admin/pages/banners/' + id);
		if(res.data.status === 'deleted'){
			notification.info({
				message: 'Deleted!',
				description:'Featured video successfully deleted.',
				placement: 'bottomRight'
			})
			loadAsync()
		}
	}
    
    return (
        <AdminLayout user={ auth.user } >

            <Head title="Featured Videos" />

            <div className='flex mt-10 justify-center items-center'>

                {/* card */}
                <div className='p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md
                    md:w-[900px]
                    sm:w-[740px]'>
                    {/* card header */}
					<div className="font-bold mb-4 text-lg">LIST OF BANNERS</div>

                    {/* card body */}
                    <div>
                        <div className='mb-2 flex gap-2'>
                            
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
                            <Column title="Name" dataIndex="name" key="name"/>
                            <Column title="Description" dataIndex="description" key="description"/>
                            <Column title="Image" dataIndex="img" key="img"/>
                    
                            <Column title="Active" dataIndex="active" key="active" render={(active)=>(
								active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
									
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
								
							)}/>
                            
                            <Column title="Action" key="action" 
                                render={(_, data:any) => (
                                    <Space size="small">

                                        <Button shape="circle" 
											icon={<EditOutlined/>} onClick={ ()=> handleEditClick(data.id) } />

                                        <Button danger shape="circle"
                                            onClick={()=> (
                                                modal.confirm({
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
        </AdminLayout>
    )
}
