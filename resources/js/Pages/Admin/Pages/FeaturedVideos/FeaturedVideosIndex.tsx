import AdminLayout from '@/Layouts/AdminLayout'
import { FeaturedVideo, PageProps, PaginateResponse } from '@/types'
import { App, Button, Input, Pagination, Space, Table } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'


const { Column } = Table;
const { Search } = Input;



import { FileAddOutlined, 
    DeleteOutlined, EditOutlined, 
    QuestionCircleOutlined } from '@ant-design/icons';
import { Head, router } from '@inertiajs/react';



export default function FeaturedVideosIndex( {auth}: PageProps ) {
    
    console.log('how many times this DOM rendered');
    

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [perPage, setPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [data, setData] = useState<FeaturedVideo[]>([])

    const { notification, modal } = App.useApp();

    const loadAsync = async () => {

        setLoading(true)
        const params = [
            `title=${search}`,
            `perpage=${perPage}`,
            `page=${page}`,
            `sort_by=id.desc`
        ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/admin/pages/get-featured-videos?${params}`);
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
        router.visit('/admin/pages/featured-videos/create');
    }
    const handleEditClick = (id:number) => {
        router.visit('/admin/pages/featured-videos/' + id + '/edit');
    }
    


    const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/admin/pages/featured-videos/' + id);
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
					<div className="font-bold mb-4 text-lg">LIST OF FEATURED VIDEOS</div>

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
                            <Column title="Title" dataIndex="title" key="title"/>
                            <Column title="Excerpt" dataIndex="excerpt" key="excerpt"/>
                            <Column title="Link" dataIndex="link" key="link"/>
                            <Column title="Order No." dataIndex="order_no" key="order_no"/>

                            <Column title="Featured" dataIndex="is_featured" key="is_featured" render={(is_featured)=>(
								
								is_featured ? (
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
