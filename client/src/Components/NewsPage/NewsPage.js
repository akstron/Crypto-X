import React ,{useState,useEffect} from 'react'
import { Select, Typography, Row,Col,Avatar,Card} from 'antd';
import moment from 'moment';
import Loader from '../Utils/Loader';
import newsIcon from '../../Images/news-icon.png'
import axios from 'axios';
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const NewsPage = ({simplified}) => {
    const count = simplified?5:10;
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const [cryptosList, setcryptosList] = useState({data:undefined,isFetching:true});
    const [cryptoNews,setCryptoNews] = useState({data:undefined,isFetching:true});

    useEffect(() => {

        let isComponentMounted = true;
    
        const getCoinsDetails=(count)=>{
            const route = process.env.REACT_APP_BACKEND + '/getCoinDetails';
            axios.post(route, {count:count}).then(res => {
                if(res['data']){
                    setcryptosList({
                        data:res.data.coins,
                        isFetching:false,
                    });
                }
            }).catch(error => {
                console.log(error);
            })
        }

        if(isComponentMounted){
            getCoinsDetails(100);
        }
        return (() => {
            isComponentMounted = false;
        })
        
    }, [])

    useEffect(()=>{
        let isComponentMounted = true;
        
        const getCoinNews=(newsCategory,count)=>{
            const route = process.env.REACT_APP_BACKEND + '/getCryptoNews';
            axios.post(route, {coin:newsCategory,count:count}).then(res => {
                if(res['data']){
                    setCryptoNews({
                        data:(res.data),
                        isFetching:false,
                    })
                }
            }).catch(error => {
                console.log(error);
            })
        }
        if(isComponentMounted){
            getCoinNews(newsCategory,count)
        }
    },[newsCategory,count])

    return (
        <>
        <div>
            {!simplified && (
                <div className='home-heading-container'>
                        <Title level={2} className='home-title'>
                            <img src={ newsIcon} height={'40px'} alt='' style={{margin:'.5rem'}}/>
                              Top Crypto News
                        </Title>
                    <div className='search-bar'>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurency">Cryptocurrency</Option>
                            {cryptosList?.data?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
                        </Select>
                    </div>
                </div>
            )}
            <Row gutter={[24,24]}>

                {(cryptoNews.isFetching)?(
                    <Loader/>
                ):(
                    <>
                        {cryptoNews?.data?.value?.map((news,id)=>(
                            <Col xs={24} sm={12} lg={8} key={id}>
                                <Card hoverable className='news-card'>
                                    <a href={news.url} target="_blank" rel="noreferrer">
                                        <div className="news-image-container">
                                            <Title className='news-title' level={4}>
                                                {news.name}
                                            </Title>
                                            <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" style={{maxWidth:'100px',maxHeight:'100px'}}/>
                                        </div>
                                        <p>
                                            {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                                        </p>
                                        <div className="provider-container">
                                            <div>
                                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                            <Text className="provider-name">{news.provider[0]?.name}</Text>
                                            </div>
                                            <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                        </div>
                                    </a>
                                </Card>
                            </Col> 
                        ))}
                    </>
                )}
            </Row>
        </div>
        </>
    )
}

export default NewsPage
