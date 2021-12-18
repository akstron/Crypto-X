import { Table,Card,Input,Space,Button} from 'antd';
import {FallOutlined,RiseOutlined,SearchOutlined} from '@ant-design/icons';
import React from 'react';
import {Loader} from '../../Components'
import millify from 'millify';
import mainLogo from '../../Images/main-logo.png'
import Highlighter from 'react-highlight-words';

class CoinTable extends React.Component {

  state = {
    searchText: '',
    searchedColumn: '',
  };


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleCoinSelect=(event)=>{
    // eslint-disable-next-line eqeqeq
    const coin=this.props.data.data.filter((coin)=>(coin.id==event.target.value));
    this.props.setCoin(coin[0]);
    this.props.next();
  }


  render() {
    const data=(this.props.data);

    const columns=[
      {
        title:'Select',
        key:'id',
        render:payload=>{
          return <input type="radio" value={payload.id} name="coins" onClick={this.handleCoinSelect}></input>
        }
      },
      {
        title:'Image',
        dataIndex:'iconUrl',
        key:'iconUrl',
        width:'12%',
        render:iconUrl=>{
          return (
            <img src={iconUrl} alt='CoinIcon' height={'20px'}/>
          )
        }
      },
      {
        title:'Coin',
        dataIndex:'name',
        key:'iconUrl',        
        sorter: (a, b) => a.name.length - b.name.length,
         ...this.getColumnSearchProps('name'),
      },
      {
        title:'Price',
        dataIndex:'price',
        key:'price',
        sorter: (a, b) => {
          return a.price - b.price;
        },
        render:price=>{
          return (
            <>
              {'$'+millify(price).toString()}
            </>
          )
        }
      },
      {
        title:'Change',
        dataIndex:'change',
        key:'change',
        sorter: (a, b) => {
          return a.change - b.change;
        },
        render:change=>{
          return (
            <>
              {millify(change)} % {(change < 0)?(<FallOutlined style={{color: "red"}}/>):(<RiseOutlined style={{color: "green"}} />)}
            </>
          )
        }
      },
      {
        title:'Market Cap',
        dataIndex:'marketCap',
        key:'marketCap',
        sorter: (a, b) => {
          return a.markerCap - b.markerCap;
        },
        render:marketCap=>{
          return (
            <>
              {millify(marketCap)}
            </>
          )
        }
      },
      {
        title:'Market Volume',
        dataIndex:'volume',
        key:'volume',
        sorter: (a, b) => {
          return a.volume - b.volume;
        },
        render:marketvolume=>{
          return (
            <>
              {millify(marketvolume)}
            </>
          )
        }
      },
    ]

    return (
      <>
        {(data?.isFetching)?(
          <>
            <Loader/>
          </>
        ):(
          <>
            <Card
                title={`Crypto Coins`}
                extra={<img className='crypto-image' alt='img' src={mainLogo} height={'25px'}/>}
                style={{margin:"1rem auto",width:"fit-content"}}
                hoverable>
              <Table 
                columns={columns} 
                dataSource={data?.data} 
                pagination={{ pageSize: 6}}
              />
            </Card>
          </>
        )}
      </>
    );
  }
}

export default CoinTable;