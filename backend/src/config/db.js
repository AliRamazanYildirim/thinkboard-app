import mongoose from 'mongoose';


const { connect, connection } = mongoose;


const connectDB = async () => {
  try {
    // Der moderne MongoDB-Treiber verwendet automatisch die besten Einstellungen  
    // Wir haben alte, veraltete Optionen entfernt
    const conn = await connect(process.env.MONGO_URI, {
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Verbindungsereignisse anhören
    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    return conn;

  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error; // Fehler nach oben werfen, anstat von process.exit
  } finally {
    // Graceful shutdown - funktioniert in jedem Fall
    process.on('SIGINT', async () => {
      try {
        await connection.close();
        console.log('MongoDB connection closed through app termination');
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
      } finally {
        process.exit(0); // Beendet den Prozess nach dem Schließen der Verbindung
      }
    });

    process.on('SIGTERM', async () => {
      try {
        await connection.close();
        console.log('MongoDB connection closed through SIGTERM');
      } catch (err) {
        console.error('Error closing MongoDB connection:', err);
      } finally {
        process.exit(0);
      }
    });
  }
};

export default connectDB;