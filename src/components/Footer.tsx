function Footer() {
  return (
    <footer className="text-white py-16 px-12" style={{backgroundColor: '#1C2B3A'}}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-xl font-light tracking-widest">YANORA</span>
        </div>
        <p className="text-sm mb-10 font-light tracking-wide" style={{color: '#A0A7B5'}}>专业医美整形，成就更美的你</p>
        <div className="flex justify-center gap-12 text-xs font-light" style={{color: '#A0A7B5'}}>
          <a href="#" className="hover:text-white transition">关于我们</a>
          <a href="#" className="hover:text-white transition">联系方式</a>
          <a href="#" className="hover:text-white transition">隐私政策</a>
          <a href="#" className="hover:text-white transition">服务条款</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
