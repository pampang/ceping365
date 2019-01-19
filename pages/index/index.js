import Link from 'next/link';
import Header from '../../components/header';
import './style.less';

export default ({ title }) => (
  <div>
    <Header title="测评365-放心做，绝对免费！" />
    <h1 className="title">测评365 - 每一天，在您身边</h1>
    <div className="list">
      <Link href='/disc' as='/disc'>
        <div className="item">
          <div className="item__title">DISC性格测试 - 帮你发现真正的你自己</div>
          <div className="item__content">
            <p className="item__text">你有没有成为领导的潜质？</p>
            <p className="item__text">你是否感觉自己怀才不遇？</p>
            <p className="item__text">DISC性格职业测试，帮你发现真正的你自己……</p>
          </div>
          <div className="item__button">马上测试！</div>
        </div>
      </Link>
    </div>
  </div>
)