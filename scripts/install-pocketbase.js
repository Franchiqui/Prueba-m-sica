// This script is run via postinstall to set up PocketBase

                const { execSync } = require('child_process');
                const path = require('path');
                const fs = require('fs');
                
                const rootPath = process.cwd(); // Get the root of the generated application
                const rootPackageJsonPath = path.join(rootPath, 'package.json');

                // Add postinstall script to root package.json
                try {
                  if (fs.existsSync(rootPackageJsonPath)) {
                    const packageJsonContent = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
                    if (!packageJsonContent.scripts) {
                      packageJsonContent.scripts = {};
                    }
                    packageJsonContent.scripts.postinstall = "cd pocket-base && npm install";
                    fs.writeFileSync(rootPackageJsonPath, JSON.stringify(packageJsonContent, null, 2), 'utf8');
                    console.log('✅ Added postinstall script to root package.json');
                  } else {
                    console.warn('⚠️ Root package.json not found at', rootPackageJsonPath);
                  }
                } catch (error) {
                  console.error('❌ Error adding postinstall script to root package.json:', error);
                }

                const pocketBasePath = path.join(rootPath, 'pocket-base'); // Use rootPath
                const installScriptPath = path.join(pocketBasePath, 'install.js');
                
                if (fs.existsSync(installScriptPath)) {
                  console.log('🔧 Ejecutando script de instalación de PocketBase...');
                  try {
                    // Cambiar al directorio pocket-base y ejecutar el script
                    process.chdir(pocketBasePath);
                    console.log('📂 Directorio actual:', process.cwd());
                    
                    // Instalar dependencias si es necesario
                    console.log('📦 Instalando dependencias...');
                    execSync('npm install', { stdio: 'inherit' });
                    
                    // Ejecutar el script de instalación
                    console.log('🚀 Iniciando la instalación de PocketBase...');
                    execSync('node install.js', { stdio: 'inherit' });
                    
                    console.log('✅ Instalación de PocketBase completada con éxito');
                  } catch (error) {
                    console.error('❌ Error durante la instalación de PocketBase:', error);
                  } finally {
                    process.chdir(rootPath); // Change back to root
                  }
                } else {
                  console.error('❌ No se encontró el script de instalación de PocketBase');
                }
              