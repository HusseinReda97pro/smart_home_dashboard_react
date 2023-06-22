import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Spin, Alert, } from 'antd';
import { Button } from 'antd';
import CourseEdit from './product_edit';

import firebase from 'firebase/compat';
import { toast } from 'react-toastify';

const ProductsList = ({ key, localSearch, searchTerm }) => {
	const [products, setProducts] = useState([]);
	const [productListError, setProductListError] = useState();
	const [productListLoading, setProductListLoading] = useState(false);

	const fetchProducts = async () => {
		try {
			const usersCollection = await firebase.firestore().collection('products').get();
			const productsData = usersCollection.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setProducts(productsData);
			console.log(products)
		} catch (error) {
			setProductListError(error);
			toast("error loading products")
		}
	};



	useEffect(async () => {
		setProductListError(null);
		setProductListLoading(true);
		await fetchProducts();

		setProductListLoading(false);
	}, []);

	;

	const productsItems = () => (
		<Row gutter={[10, 10]}>
			{products?.length === 0 ? (
				<Alert message='No Products' type='warning' />
			)
				// : products?.filter(localSearch(searchTerm)).length === 0 ? (
				// 	<Alert message='No products matched your keywords' type='warning' />)
				: (
					// products?.filter(localSearch(searchTerm))
					products.map(product => (
						<Col xs={24} md={12} xl={8} key={product.id}>
							<Card
								type='flux'
								actions={[
									<Row>
										<Col style={{ width: "30%", }}>
											<Link to={`/products/${product.id}`}>
												<Button type='primary' style={{ backgroundColor: "#413960" }}>View</Button>
											</Link>
										</Col>
										<Col style={{ width: "40%" }}>

											<CourseEdit course={product} />
										</Col>
										<Col style={{ width: "30%" }}>

											<Link to={`/products/${product.id}/items`}>
												<Button type='primary' style={{ backgroundColor: "#413960" }}>Items</Button>
											</Link>
										</Col>


									</Row>
								]}
								// extra={
								// 	<Switch
								// 		loading={courseUpdateLoading}
								// 		checkedChildren={<CheckOutlined />}
								// 		unCheckedChildren={<CloseOutlined />}
								// 		checked={false}
								// 		onChange={checked =>
								// 			handleCourseEnable(checked, product)
								// 		}
								// 	/>
								// }
								cover={
									<img
										alt={product.name}
										src={
											product.image
												? product.image
												: 'https://i.stack.imgur.com/y9DpT.jpg'
										}
									/>
								}
								// title={product.name}

								style={{ boxShadow: 'var(--bs)', height: '100%' }}
							>
								<h2 style={{ textAlign: 'center' }}>{product.name}</h2>
							</Card>
						</Col >
					))
				)}
		</Row >
	);

	return (
		<div style={{ marginTop: '25px' }}>

			{/* for filters */}
			{/* <Row gutter={[10, 10]} style={{ marginBottom: '25px' }}>
				<Col>
					<label>
						<Select
							placeholder='Select Level'
							onChange={e => setLevel(e)}
							size='large'
							defaultValue='All Levels'
							dropdownMatchSelectWidth={false}
						>
							<Select.Option value='' onChange={handleAllChange}>
								All Levels
							</Select.Option>
							<Select.Option value='1'>1</Select.Option>
							<Select.Option value='2'>2</Select.Option>
							<Select.Option value='3'>3</Select.Option>
							<Select.Option value='4'>4</Select.Option>
							<Select.Option value='5'>5</Select.Option>
						</Select>
					</label>
				</Col>
				<Col>
					<label>
						<Select
							placeholder='Select Type'
							onChange={e => setType(e)}
							size='large'
							defaultValue='All Types'
							dropdownMatchSelectWidth={false}
						>
							<Select.Option value='' onChange={handleAllChange}>
								All Types
							</Select.Option>
							{types?.map(type => (
								<Select.Option value={type.name} key={type._id}>
									{type.name}
								</Select.Option>
							))}
						</Select>
					</label>
				</Col>
			</Row> */}
			{productListLoading ? (
				<Spin />
			) : productListError ? (
				<Alert message={productListError} type='error' />
			) : (
				productsItems()
			)}
		</div>
	);
};

export default ProductsList;
