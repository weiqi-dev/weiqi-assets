/**
 * Weiqi Share - 围棋棋谱分享库
 * 提供二维码生成、编码解码功能
 * https://weiqi-dev.github.io/weiqi-assets/js/share.js
 */

const WeiqiShare = {
    // 配置
    config: {
        decodeUrl: 'https://weiqi-dev.github.io/weiqi-assets/share/',
        cdnUrl: 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js',
        libUrl: 'https://weiqi-dev.github.io/weiqi-assets/js/share.js'
    },

    /**
     * 检测微信浏览器
     */
    isWechat() {
        return /MicroMessenger/i.test(navigator.userAgent);
    },

    /**
     * 加载 QRCode 库
     */
    loadQRCodeLib(callback) {
        if (window.QRCode) {
            callback && callback();
            return;
        }
        const script = document.createElement('script');
        script.src = this.config.cdnUrl;
        script.onload = () => callback && callback();
        script.onerror = () => console.error('QRCode lib load failed');
        document.head.appendChild(script);
    },

    /**
     * 编码棋谱为紧凑格式
     * @param {Array} gameState - 棋谱数组 [{col, row, player, isPass}, ...]
     * @returns {string|null} Base64 URL-safe 编码字符串
     */
    encode(gameState) {
        const moves = gameState.filter(m => !m.isPass);
        if (moves.length === 0) return null;

        // 文件头: Magic(1) + Version(1) + BoardSize(1) + Handicap(1)
        const header = new Uint8Array([0x57, 0x01, 0x13, 0x00]);

        // 手数数据: 每手2字节 (Color 1bit + X 7bit, Y 8bit)
        const data = new Uint8Array(moves.length * 2);
        for (let i = 0; i < moves.length; i++) {
            const m = moves[i];
            const color = m.player === 'W' ? 1 : 0;
            data[i * 2] = (color << 7) | (m.col & 0x7F);
            data[i * 2 + 1] = m.row & 0xFF;
        }

        // 合并
        const compact = new Uint8Array(header.length + data.length);
        compact.set(header);
        compact.set(data, header.length);

        // Base64 URL-safe 编码
        return btoa(String.fromCharCode(...compact))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    },

    /**
     * 解码 Base64 为棋谱数据
     * @param {string} base64 - URL-safe Base64 字符串
     * @returns {Object|null} {boardSize, handicap, moves: [{color, x, y}]}
     */
    decode(base64) {
        try {
            // URL-safe Base64 解码
            const normalized = base64.replace(/-/g, '+').replace(/_/g, '/');
            const padded = normalized + '='.repeat((4 - normalized.length % 4) % 4);
            const binary = Uint8Array.from(atob(padded), c => c.charCodeAt(0));

            // 解析文件头
            const magic = binary[0];
            const version = binary[1];
            const boardSize = binary[2];
            const handicap = binary[3];

            if (magic !== 0x57) {
                throw new Error('Invalid data format');
            }

            // 解析手数
            const moves = [];
            for (let i = 4; i < binary.length; i += 2) {
                if (i + 1 >= binary.length) break;
                const color = (binary[i] & 0x80) ? 'W' : 'B';
                const x = binary[i] & 0x7F;
                const y = binary[i + 1];
                moves.push({ color, x, y });
            }

            return { boardSize, handicap, moves };
        } catch (err) {
            console.error('Decode error:', err);
            return null;
        }
    },

    /**
     * 棋谱数据转 SGF 格式
     * @param {Object} data - {boardSize, moves: [{color, x, y}]}
     * @returns {string} SGF 字符串
     */
    toSGF(data) {
        const coords = 'abcdefghijklmnopqrstuvwxyz';
        let sgf = `(;GM[1]FF[4]SZ[${data.boardSize}]CA[UTF-8]AP[WeiqiRecorder]KM[0]`;

        for (const move of data.moves) {
            const coord = coords[move.x] + coords[move.y];
            sgf += `;${move.color}[${coord}]`;
        }

        sgf += ')';
        return sgf;
    },

    /**
     * 获取分享 URL
     * @param {string} encodedData - 编码后的数据
     * @returns {string} 完整的分享 URL
     */
    getShareUrl(encodedData) {
        return this.config.decodeUrl + '?d=' + encodedData;
    },

    /**
     * 生成二维码
     * @param {HTMLElement} container - 容器元素
     * @param {Array} gameState - 棋谱数组
     * @returns {Promise} 生成完成
     */
    generateQR(container, gameState) {
        return new Promise((resolve, reject) => {
            const encoded = this.encode(gameState);
            if (!encoded) {
                reject(new Error('Empty game'));
                return;
            }

            this.loadQRCodeLib(() => {
                const url = this.getShareUrl(encoded);
                container.innerHTML = '';

                new QRCode(container, {
                    text: url,
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.M
                });

                // canvas 转 img，支持微信长按识别
                requestAnimationFrame(() => {
                    const canvas = container.querySelector('canvas');
                    if (canvas) {
                        const img = document.createElement('img');
                        img.src = canvas.toDataURL('image/png');
                        img.style.width = '200px';
                        img.style.height = '200px';
                        img.alt = '扫码下载棋谱';
                        container.innerHTML = '';
                        container.appendChild(img);
                    }
                    resolve();
                });
            });
        });
    },

    /**
     * 处理解码页面（扫码后的着陆页）
     * 自动下载 SGF 文件
     */
    handleDecodePage() {
        const params = new URLSearchParams(location.search);
        const base64 = params.get('d');

        if (!base64) {
            this.showMessage('无效的棋谱链接');
            return;
        }

        const data = this.decode(base64);
        if (!data) {
            this.showMessage('棋谱解码失败');
            return;
        }

        const sgf = this.toSGF(data);
        this.download(sgf, data.moves.length);
        this.showMessage(`棋谱已下载（${data.moves.length}手）`);
    },

    /**
     * 下载 SGF 文件
     * @param {string} sgf - SGF 内容
     * @param {number} moveCount - 手数（用于文件名）
     */
    download(sgf, moveCount) {
        const blob = new Blob([sgf], { type: 'application/x-go-sgf' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        const now = new Date();
        const dateStr = now.getFullYear().toString() +
                       String(now.getMonth() + 1).padStart(2, '0') +
                       String(now.getDate()).padStart(2, '0') + '_' +
                       String(now.getHours()).padStart(2, '0') +
                       String(now.getMinutes()).padStart(2, '0');
        a.download = `棋谱_${dateStr}_${moveCount}手.sgf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    /**
     * 显示消息提示
     * @param {string} msg - 消息内容
     */
    showMessage(msg) {
        // 创建提示元素
        let toast = document.getElementById('weiqi-share-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'weiqi-share-toast';
            toast.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.75);
                color: white;
                padding: 16px 28px;
                border-radius: 8px;
                font-size: 16px;
                z-index: 9999;
                pointer-events: none;
            `;
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
        }, 2000);
    }
};

// 自动处理解码页面
if (document.currentScript && document.currentScript.src.includes('/share/')) {
    document.addEventListener('DOMContentLoaded', () => {
        WeiqiShare.handleDecodePage();
    });
}
