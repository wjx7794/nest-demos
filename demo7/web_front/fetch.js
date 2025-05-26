async function fetchSSE() {
  const url = 'http://localhost:3000/push';
  try {
    const response = await fetch(url);
    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      console.log(value);

      // 解析 SSE 消息格式
      value.split('\n\n').forEach((chunk) => {
        const event = {};
        chunk.split('\n').forEach((line) => {
          if (line.startsWith('data:')) {
            event.data = JSON.parse(line.replace('data: ', ''));
          }
          // 解析其他字段 (event / id / retry)
        });
        console.log(event);
      });
    }
  } catch (err) {
    console.error('SSE 请求失败:', err);
  }
}
