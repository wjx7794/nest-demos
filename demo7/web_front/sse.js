function connect() {
  /**
   * 1. 创建 SSE 连接
   * - 入参: 服务器端提供 SSE 数据流的 URL
   * - 作用: 浏览器会通过这个 URL 建立一个持久的 HTTP 连接
   */
  const eventSource = new EventSource('http://localhost:3000/push'); // 不要写 localhost

  /**
   *
   * 2. 监听消息
   * - 浏览器会监听 SSE 连接，等待服务器推送消息
   * - 当有消息时，浏览器会自动执行 onmessage 回调函数
   */
  eventSource.onmessage = ({ data }) => {
    const message = document.createElement('li');
    message.innerText = data;
    document.body.appendChild(message);

    // 可以通过调用 EventSource.close() 手动关闭 SSE 连接
    setTimeout(() => {
      eventSource.close();
      console.log('SSE 连接已关闭');
    }, 5000);
  };

  /**
   * 3. 监听连接事件
   * - 可以监听连接的状态变化，如打开连接、连接出错等
   */
  // 连接成功
  eventSource.onopen = function () {
    console.log('SSE 连接已建立');
  };
  // 连接出错
  eventSource.onerror = function (error) {
    console.error('SSE 连接出错', error);
  };
}
