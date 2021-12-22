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
        const getCoinsDetailsAPI=(count)=>{
            const options = {
                method: 'GET',
                url: 'https://coinranking1.p.rapidapi.com/coins?limit='+count,
                headers: {
                    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
                    'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
                }
            };

            axios.request(options).then(function (response) {
                setcryptosList({
                    data:response.data.data.coins,
                    isFetching:false,
                });
            }).catch(function (error) {
                console.error(error);
            });
        }
        if(isComponentMounted) getCoinsDetailsAPI(100);
        return (() => {
            isComponentMounted = false;
        })
        
    }, [])

    useEffect(()=>{
        let isComponentMounted = true;
        const cryptoNews=(coin,count)=>{
            var options = {
                method: 'GET',
                url: 'https://bing-news-search1.p.rapidapi.com/news/search',
                params: {q: coin, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off',count:count},
                headers: {
                    'x-bingapis-sdk': 'true',
                    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
                    'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
                }
            };
            axios.request(options).then(function (response) {
                setCryptoNews({
                    data:(response.data),
                    isFetching:false,
                })
            }).catch(function (error) {
                console.error(error);
            });
        }
        if(isComponentMounted){
            cryptoNews(newsCategory,count)
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
