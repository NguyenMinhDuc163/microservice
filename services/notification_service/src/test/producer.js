const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'test-producer',
  brokers: ['kafka:9092'],  // Giá trị cứng cho broker
  retry: {
    initialRetryTime: 100,
    retries: 8
  }
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
  allowAutoTopicCreation: true
});

const admin = kafka.admin();

async function createTopicIfNotExists() {
  try {
    await admin.connect();
    const topics = await admin.listTopics();
    
    if (!topics.includes('leave-requests')) {
      console.log(`Đang tạo topic leave-requests...`);
      await admin.createTopics({
        topics: [{
          topic: 'leave-requests',
          numPartitions: 1,
          replicationFactor: 1
        }]
      });
      console.log(`Đã tạo topic leave-requests thành công`);
    }
  } catch (error) {
    console.error('Lỗi khi tạo topic:', error);
    throw error;
  } finally {
    await admin.disconnect();
  }
}

async function waitForKafka() {
  let retries = 5;
  while (retries > 0) {
    try {
      await producer.connect();
      console.log('Đã kết nối đến Kafka');
      return true;
    } catch (error) {
      console.log(`Không thể kết nối đến Kafka, còn ${retries} lần thử...`);
      retries--;
      if (retries === 0) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function main() {
  try {
    await createTopicIfNotExists();
    await waitForKafka();

    const notification = {
      recipientId: 1,           // ID người nhận dạng số
      recipientName: 'Tran Van B',
      recipientType: 'MANAGER',
      type: 'REMINDER',
      message: 'Bạn có đơn xin nghỉ phép chưa duyệt',
      status: 'SENT',
      requestId: 1,            // ID request dạng số
      pendingSince: '2024-03-19T10:30:00.000Z',
      employeeId: 1,           // ID nhân viên dạng số
      employeeName: 'Nguyen Van A',
      createdAt: new Date().toISOString()
    };

    await producer.send({
      topic: 'leave-requests',
      messages: [
        { value: JSON.stringify(notification) }
      ]
    });

    console.log('Đã gửi thông báo:', notification);
  } catch (error) {
    console.error('Lỗi:', error);
    process.exit(1);
  } finally {
    await producer.disconnect();
  }
}

main(); 