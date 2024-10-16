import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Post, PageProps, User, Status } from '@/types'
import { Head, router } from '@inertiajs/react'

import { FileAddOutlined, DropboxOutlined, 
	DownOutlined,
    DeleteOutlined, EditOutlined, 
	EyeOutlined,UserOutlined,
    ProjectOutlined, DeliveredProcedureOutlined, PaperClipOutlined,
	PicRightOutlined } from '@ant-design/icons';

import { Card, Space, Table, 
    Pagination, Button, Modal,
    Form, Input, Select, Checkbox,
    notification, 
	Dropdown,
	MenuProps,
	App} from 'antd';


import React, { KeyboardEvent, useEffect, useState } from 'react'
import axios from 'axios';


const { Column } = Table;

interface PostResponse {
	data:any[]
	//data: Post[];
	total: number;
}

interface Option {
	label: string;
	value: string;
  }


import dayjs from 'dayjs';
import { AnyObject } from 'antd/es/_util/type';
import ArticleView from '@/Components/Post/ArticleView';

const dateFormat = (item:Date):string=> {
	return dayjs(item).format('MMM-DD-YYYY')
}

export default function AuthorPostIndex(
	{  auth, permissions } : 
	PageProps) {

	const { modal } = App.useApp();

	const [form] = Form.useForm();

    const [data, setData] = useState<Post[]>([]);

    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

	const [status, setStatus] = useState('');
	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    
	const createMenuItems = (post:Post) => {

		const items: MenuProps['items'] = [];
	  
		if(post.status === 'draft' || post.status === 'return') { //published (7)
			items.push(
			{
				label: 'Edit',
				key: '1',
				icon: <EditOutlined />,
				onClick: () => handleEditClick(post.id),
			},
			{
				label: 'Trash',
				key: '2',
				icon: <DeleteOutlined />,
				onClick: () => handleTrashClick(post.id)
			},
			{
				label: 'Draft',
				key: '5',
				icon: <PaperClipOutlined />,
				onClick: () => {
					setLoading(true)
					axios.post('/author/posts-draft/' + post.id).then(res=>{
						if(res.data.status === 'draft'){
							modal.info({
								title: 'Draft!',
								content: 'Successfully draft.'
							})
							loadAsync(search, perPage, page)
							setLoading(false)
						}
					})
				},
			},
			{
				key: 'posts.submit-for-publishing',
				icon: <ProjectOutlined />,
				label: 'Submit for Publishing',
				onClick: () => {
					setLoading(true)
					axios.post('/author/posts-submit-for-publishing/' + post.id).then(res=>{
						if(res.data.status === 'submit-for-publishing'){
							modal.info({
								title: 'Submitted!',
								content: 'Successfully submitted.'
							})
							setLoading(false)
							loadAsync(search, perPage, page)
						}
					})
				},
			});
		}


		items.push({
			label: 'View',
			key: '7',
			icon: <EyeOutlined />,
			onClick: () => {
				modal.info({
					width: 1024,
					title: 'Article',
					content: (
						<ArticleView post={post} className=""/>
					),
				onOk() {},
				});
			},
		})

		return items;
	}


	const loadAsync = async (
		search:string,
		perPage: number,
		page:number
	) => {

		const params = [
			`perpage=${perPage}`,
			`search=${search}`,
			`page=${page}`,
			`status=${status}`
		].join('&');
		try{
			const res = await axios.get<PostResponse>(`/author/get-posts?${params}`);
			setData(res.data.data)
			setTotal(res.data.total)
		}catch(err){
			console.log(err)
		}
	}

    useEffect(()=>{
		
		loadAsync('', perPage, page);

	
    },[status, perPage, page])

    const onPageChange = (index:number, perPage:number) => {
		console.log(index);
		
        setPage(index)
        setPerPage(perPage)
    }

	
	const handleStatusChange = (value:string) => {
		setStatus(value)
		//loadAsync(search, perPage, page)
	}



	//truncate display content on table
	const truncate = (text: string, limit: number) => {
		if(text.length > 0){
			const words = text.split(' ');
			if (words.length > limit) {
				return words.slice(0, limit).join(' ') + '...';
			}
			return text;
		}else{
			return ''
		}
	}
	

	const handClickNew = () => {
		router.visit('/author/posts/create');
    }
	const handleEditClick = (id:number) => {
		router.visit('/author/posts/' + id + '/edit');
	}
	const handleTrashClick = (id:number) => {
		setLoading(true)
		modal.confirm({
			title: 'Trash?',
			content: 'Are you sure you want to move to trash this post?',
			onOk: async ()=>{
				const res = await axios.post('/author/posts-trash/' + id);
				if(res.data.status === 'trashed'){
					loadAsync(search, perPage, page);
					setLoading(false)
				}
			}
		})
	}
	const handleSoftDelete = (id:number) => {
		modal.confirm({
			title: 'Delete?',
			content: 'Are you sure you want to delete this post?',
			onOk: async ()=>{
				const res = await axios.post('/author/posts-soft-delete/' + id);
				if(res.data.status === 'soft_deteled'){
					loadAsync(search, perPage, page);
				}
			}
		})
	}

	const handSearchClick = () => {
		loadAsync(search, perPage, page);
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if(e.key === 'Enter')
			handSearchClick()
	}

	/**handle error image */
	const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = '/img/no-img.png';
	}
	
	return (

		<Authenticated user={auth.user}>
			<Head title="POST/ARTICLE"></Head>

			<div className='flex mt-10 w-full justify-center items-center'>
				{/* card */}
				<div className='p-6 w-[1320px] overflow-auto mx-2 bg-white shadow-sm rounded-md
					sm:w-[740px]
					md:w-[1200px]'>
					{/* card header */}
					<div className="font-bold text-lg mb-4">LIST OF ARTICLES</div>

					{/* card body */}

					<div className='flex gap-2 mb-2'>
						<Select
							onChange={handleStatusChange}
							style={{
								width: '200px'
							}}
							
							defaultValue=""
							options={[
								{ label: 'All', value: '' }, 
								{ label: 'Draft', value: 'draft' }, 
								{ label: 'Submit for Publishing', value: 'submit' }
							]}
						/>
						
						<Input placeholder="Search Title" 
							onKeyDown={handleKeyDown}
							value={search} onChange={ (e) => setSearch(e.target.value)}/>
						<Button type='primary' onClick={handSearchClick}>SEARCH</Button>
					</div>

					{/* {
						permissions.includes('posts.create') && (
							
					)} */}
					<div className='flex flex-end my-2'>
						<Button className='ml-auto' 
							icon={<FileAddOutlined />} 
							type="primary" onClick={handClickNew}>
							NEW
						</Button>     
					</div>
					
					<div>

						<Table dataSource={data}
							loading={loading}
							rowKey={(data) => data.id}
							pagination={false}>

							<Column title="Img" dataIndex="featured_image"
								render={(featured_image) => (
									(
										<div className="h-[40px] w-[40px]">
											<img src={`/storage/featured_images/${featured_image}`}
                            					onError={ handleImageError } />
										</div>
									)
									
								)} />

							<Column title="Id" dataIndex="id"/>
							<Column title="Title" dataIndex="title" key="title"/>
							<Column title="Excerpt" 
								dataIndex="excerpt"
								key="excerpt"
								render={(excerpt) => (
									<span>{ excerpt ? truncate(excerpt, 10) : '' }</span>
								)} 
							/>
							

							<Column title="Publication Date" key="publication_date"
								render={(data) => (
									<>
										{data.publication_date && dateFormat(data.publication_date)}
									</>
								)}
							/>
						
							<Column title="Status" dataIndex="status" key="status" render={ (status) => (

									<div>
										{status === 'submit' && (
											<div className='bg-green-300 font-bold text-center text-[10px] px-2 py-1 rounded-full'>
												SUBMIT FOR PUBLISHING
											</div>
										
										)}
										{status === 'publish' && (
											<div className='bg-green-200 font-bold text-center text-[10px] px-2 py-1 rounded-full'>
												PUBLISHED
											</div>
										)}

										{status === 'draft' && (
											<div className='bg-orange-200 font-bold text-center text-[10px] px-2 py-1 rounded-full'>
												DRAFT
											</div>
										)}

										{status === 'return' && (
											<div className='bg-red-200 font-bold text-center text-[10px] px-2 py-1 rounded-full'>
												RETURN TO AUTHOR
											</div>
										)}

									</div>
									
								)}
								/>
							
							<Column title="Featured" dataIndex="is_featured" key="is_featured" render={(is_featured)=>(
								
								is_featured ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
									
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
								
							)}/>

							<Column
                                title="Date Created"
                                key="created_at"
                                render={(data)=> (
                                        <>
                                            {data.created_at &&
                                                dateFormat(data.created_at)}
                                        </>
                                )}
                            />
							
							<Column title="Action" key="action" 
								render={(_, data: Post) => (
									<Space size="small">
										<Dropdown.Button menu={{items: createMenuItems(data) }} type='primary'>
											Options
										</Dropdown.Button>
									</Space>
								)}
							/>
						</Table>

						<Pagination className='my-10' 
							onChange={onPageChange}
							defaultCurrent={1}
							total={total} />
					</div>
				</div>
				{/* card */}
				
			</div>

		</Authenticated>
	)
}
