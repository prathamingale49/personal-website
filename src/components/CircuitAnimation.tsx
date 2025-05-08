import React, { useEffect, useRef } from 'react';

export const CircuitAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Circuit node class
    class Node {
      x: number;
      y: number;
      radius: number;
      connections: Node[];
      pulseRadius: number;
      maxPulseRadius: number;
      pulseSpeed: number;
      pulseActive: boolean;
      color: string;
      glowIntensity: number;
      glowDirection: number;
      connectionOpacity: number;

      constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.connections = [];
        this.pulseRadius = 0;
        this.maxPulseRadius = radius * 4;
        this.pulseSpeed = 0.3 + Math.random() * 0.4;
        this.pulseActive = false;
        this.color = '#00FFFF';
        this.glowIntensity = 0;
        this.glowDirection = 1;
        this.connectionOpacity = 0.3;
        
        // Randomly activate pulse
        setTimeout(() => {
          this.activatePulse();
        }, Math.random() * 3000);
      }

      connect(node: Node) {
        if (!this.connections.includes(node)) {
          this.connections.push(node);
          node.connections.push(this);
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw connections with gradient
        this.connections.forEach(node => {
          const gradient = ctx.createLinearGradient(this.x, this.y, node.x, node.y);
          gradient.addColorStop(0, `rgba(0, 255, 255, ${this.connectionOpacity})`);
          gradient.addColorStop(1, `rgba(0, 255, 255, ${node.connectionOpacity})`);
          
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Draw node glow
        const glowGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 2
        );
        glowGradient.addColorStop(0, `rgba(0, 255, 255, ${this.glowIntensity * 0.5})`);
        glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw pulse if active
        if (this.pulseActive) {
          const pulseGradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.pulseRadius
          );
          const opacity = 1 - (this.pulseRadius / this.maxPulseRadius);
          pulseGradient.addColorStop(0, `rgba(0, 255, 255, ${opacity * 0.8})`);
          pulseGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = pulseGradient;
          ctx.fill();

          this.pulseRadius += this.pulseSpeed;
          if (this.pulseRadius > this.maxPulseRadius) {
            this.pulseRadius = 0;
            this.pulseActive = false;
            
            // Reactivate after delay
            setTimeout(() => {
              this.activatePulse();
            }, 1000 + Math.random() * 4000);
          }
        }

        // Update glow intensity
        this.glowIntensity += 0.02 * this.glowDirection;
        if (this.glowIntensity >= 1) {
          this.glowDirection = -1;
        } else if (this.glowIntensity <= 0) {
          this.glowDirection = 1;
        }

        // Update connection opacity
        this.connectionOpacity = 0.2 + Math.sin(Date.now() * 0.001) * 0.1;
      }

      activatePulse() {
        this.pulseActive = true;
        this.pulseRadius = 0;
        
        // Activate connected nodes with delay
        this.connections.forEach((node, index) => {
          setTimeout(() => {
            node.activatePulse();
          }, 150 * (index + 1));
        });
      }
    }

    // Create nodes with improved distribution
    const numNodes = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    const nodes: Node[] = [];
    
    // Create nodes in a more organized pattern
    const gridSize = Math.ceil(Math.sqrt(numNodes));
    const cellWidth = canvas.width / gridSize;
    const cellHeight = canvas.height / gridSize;
    
    for (let i = 0; i < numNodes; i++) {
      const gridX = (i % gridSize) * cellWidth;
      const gridY = Math.floor(i / gridSize) * cellHeight;
      
      // Add some randomness within the grid cell
      const x = gridX + Math.random() * cellWidth * 0.8;
      const y = gridY + Math.random() * cellHeight * 0.8;
      const radius = 2 + Math.random() * 2;
      nodes.push(new Node(x, y, radius));
    }

    // Create connections with improved logic
    nodes.forEach(node => {
      // Find nearest nodes within a certain radius
      const maxConnections = 3;
      const maxDistance = Math.min(canvas.width, canvas.height) * 0.15;
      
      const otherNodes = nodes.filter(n => n !== node);
      const sortedNodes = otherNodes.sort((a, b) => {
        const distA = Math.sqrt(Math.pow(a.x - node.x, 2) + Math.pow(a.y - node.y, 2));
        const distB = Math.sqrt(Math.pow(b.x - node.x, 2) + Math.pow(b.y - node.y, 2));
        return distA - distB;
      });
      
      // Connect to nearest nodes within maxDistance
      let connections = 0;
      for (const otherNode of sortedNodes) {
        const distance = Math.sqrt(Math.pow(otherNode.x - node.x, 2) + Math.pow(otherNode.y - node.y, 2));
        if (distance <= maxDistance && connections < maxConnections) {
          node.connect(otherNode);
          connections++;
        }
      }
    });

    // Animation loop with improved performance
    let lastTime = 0;
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      nodes.forEach(node => {
        node.draw(ctx);
      });
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

