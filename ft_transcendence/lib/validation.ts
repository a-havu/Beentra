export function validateEnv() {
  //variables must be defined in env file
  const requiredEnvVars = ['JWT_SECRET','SALT_ROUNDS','DATABASE_URL'];
  
  //the missing variables will be stored here
  const missingVars: string[] = [];

  requiredEnvVars.forEach((envVar) => {
    const value = process.env[envVar];
    if (!value || value.trim() === '') {
      missingVars.push(envVar);
    }
  });

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:');
    missingVars.forEach((v) => console.error(`   - ${v}`));
    console.error('\n✅ Add these to your .env file and restart the server');
    process.exit(1);
  }

  if(process.env.SALT_ROUNDS){
    const saltRounds = Number(process.env.SALT_ROUNDS);
    if(isNaN(saltRounds) || !Number.isInteger(saltRounds) || saltRounds <= 0){
      console.error('❌ SALT_ROUNDS must be a positive integer');
      process.exit(1);
    }   
  }

  console.log('✅ Environment variables validated successfully');
}