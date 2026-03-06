-- =====================================================
-- YANORA 快速数据导入脚本
-- 在新的 Supabase 账号中运行此脚本快速创建示例数据
-- =====================================================

-- =====================================================
-- 1. FAQ 示例数据
-- =====================================================

INSERT INTO faqs (category, question, answer, display_order, is_active) VALUES
-- 整形手术类别
('整形手术', '整形手术是否安全？', '我们的整形手术由经验丰富的专业医生执行，采用先进的医疗设备和技术，确保手术的安全性和效果。所有手术都在符合欧盟医疗标准的诊所进行。', 1, true),
('整形手术', '整形手术需要多长时间？', '手术时间根据项目不同而异，一般从30分钟到4小时不等。例如：注射类项目约30-60分钟，鼻部整形约2-3小时。具体时间会在术前咨询时告知。', 2, true),
('整形手术', '恢复期需要多久？', '恢复期因手术类型而异。注射类项目通常1-3天，面部轮廓手术一般需要1-2周，身体塑形可能需要2-4周。我们会提供详细的术后护理指导。', 3, true),
('整形手术', '手术后会留下疤痕吗？', '我们采用微创技术和精细缝合方法，将疤痕降到最小。大多数疤痕会隐藏在自然褶皱或发际线中，随着时间推移会逐渐淡化。', 4, true),

-- 预约咨询类别
('预约咨询', '如何预约咨询？', '您可以通过我们的网站在线预约系统、电话 +33 1 XX XX XX XX 或电子邮件 info@yanora.com 预约咨询。我们会在24小时内回复您的预约请求。', 1, true),
('预约咨询', '咨询费用是多少？', '首次咨询费用为100欧元。此费用可在后续决定进行手术时抵扣手术费用。咨询包括医生面诊、详细方案制定和效果模拟。', 2, true),
('预约咨询', '可以线上咨询吗？', '是的，我们提供视频咨询服务。您可以通过 Zoom 或微信视频与我们的医生进行远程咨询，费用为50欧元。', 3, true),
('预约咨询', '需要准备什么材料？', '请准备您的身份证件、过往病历（如有）、正在服用的药物清单，以及您希望改善的部位照片。这些有助于医生更好地了解您的需求。', 4, true),

-- 费用支付类别
('费用支付', '手术费用如何计算？', '费用根据手术项目、复杂程度和所需材料而定。我们会在咨询时提供详细的费用明细和报价单。所有费用透明公开，无隐藏收费。', 1, true),
('费用支付', '支持哪些支付方式？', '我们接受现金、银行转账、信用卡、PayPal、微信支付和支付宝。可以选择一次性付款或分期付款方案。', 2, true),
('费用支付', '可以退款吗？', '如需取消预约，请至少提前48小时通知。咨询费可转至下次预约。已支付的手术定金，在手术前7天取消可退50%，少于7天则不予退还。', 3, true),
('费用支付', '是否提供分期付款？', '是的，我们与多家金融机构合作，提供3-24个月的分期付款方案，最低月利率0.9%起。具体方案可在咨询时详细了解。', 4, true),

-- 术后护理类别
('术后护理', '术后需要住院吗？', '大部分手术无需住院，当天即可回家休息。少数复杂手术可能需要留院观察1-2天。我们会根据您的具体情况提供建议。', 1, true),
('术后护理', '术后多久可以看到效果？', '注射类项目立即见效，肿胀消退后效果更明显（3-7天）。手术类项目需要等待肿胀完全消退，通常2-6周可见初步效果，3-6个月达到最佳效果。', 2, true),
('术后护理', '术后有哪些注意事项？', '避免剧烈运动、高温环境、饮酒和吸烟。按时服用医生开具的药物，定期复诊检查。保持手术部位清洁干燥，避免阳光直射。', 3, true),
('术后护理', '提供术后跟踪服务吗？', '是的，我们提供1年免费术后跟踪服务。包括定期复诊、24小时紧急咨询热线、微信在线咨询和术后修复指导。', 4, true)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 2. 简单案例数据（首页展示）
-- =====================================================

-- 注意：请将图片URL替换为您实际上传的图片地址
INSERT INTO case_studies (before_image_url, after_image_url, display_order) VALUES
('/24a1e5e820d6d721e7aa3970ae648b43.jpg', '/3ba84e3181bb4794304515b7dc9aad6f.jpg', 1),
('/3d931fc8d4b7d9ba6357f51f842da33d.jpg', '/5ef6dae25777256ca4e3fafedffbbea9.jpg', 2),
('/6492d5ffd9ae5616e415a8afbe984073.jpg', '/68744e766a6b63d88f86d714366bcd31.jpg', 3),
('/c324214cb2a62d16d00510d9652c0f60.jpg', '/56315efc544d966bb744e9a52c7de1f4.png', 4)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 3. 详细案例数据
-- =====================================================

INSERT INTO detailed_cases (
  title, title_en,
  description, description_en,
  before_image_url, after_image_url,
  category, show_in_facial, show_in_dental, show_in_injection, show_in_body, show_in_hair,
  display_order, is_published
) VALUES
-- 面部轮廓案例
(
  '自然鼻部综合整形',
  'Natural Comprehensive Rhinoplasty',
  '客户希望改善鼻梁高度和鼻尖形状，打造自然立体的欧式鼻型。通过鼻综合整形手术，结合自体软骨移植技术，成功塑造了和谐自然的鼻部轮廓。手术采用微创技术，恢复期仅需2周，效果持久自然。',
  'The client wanted to improve the nose bridge height and tip shape for a natural European look. Through comprehensive rhinoplasty with autologous cartilage grafting, we successfully created a harmonious and natural nose contour. The minimally invasive technique required only 2 weeks recovery time with long-lasting natural results.',
  '/white_facial_features/3.png',
  '/black_facial_features/1_(1).png',
  '面部轮廓',
  true, false, false, false, false,
  1, true
),
(
  '下颌角塑形 - V脸打造',
  'Jaw Contouring - V-line Creation',
  '通过下颌角截骨手术，为客户打造精致小巧的V型脸。手术采用口内切口，无外部疤痕。结合面部脂肪填充，实现了立体自然的面部轮廓。术后3个月达到最佳效果，脸型柔和自然。',
  'Through mandibular angle osteotomy, we created a refined V-line face shape. The intraoral incision left no external scars. Combined with facial fat grafting, we achieved three-dimensional natural facial contours. Optimal results were visible after 3 months with soft natural features.',
  '/east_asian_facial_features/1_(2).png',
  '/micro_upturned_nose/b2b5b16dac1c3a8548d76a8e65d9cf2c.png',
  '面部轮廓',
  true, false, false, false, false,
  2, true
),

-- 牙齿美容案例
(
  '全瓷贴面美白修复',
  'All-Ceramic Veneer Whitening',
  '客户牙齿发黄且有轻微不整齐。采用德国进口全瓷贴面技术，仅需磨除极少量牙釉质，即可实现持久美白和形态修复。整个过程仅需2次就诊，无痛舒适，效果可持续15年以上。',
  'The client had yellowed and slightly misaligned teeth. Using German imported all-ceramic veneer technology, we achieved long-lasting whitening and shape correction with minimal enamel removal. The entire process required only 2 visits, was painless and comfortable, with results lasting over 15 years.',
  '/public/dental_before1.jpg',
  '/public/dental_after1.jpg',
  '牙齿美容',
  false, true, false, false, false,
  1, true
),
(
  '隐形正畸 - 完美牙列',
  'Invisible Orthodontics - Perfect Alignment',
  '使用最新一代隐形牙套技术，为客户矫正牙齿排列。整个疗程12个月，无需金属托槽，美观舒适。通过3D数字化设计，精确预测每一步移动，最终实现完美整齐的牙列。',
  'Using latest generation invisible aligner technology to correct tooth alignment. The 12-month treatment required no metal brackets, was aesthetically pleasing and comfortable. Through 3D digital design, we precisely predicted each movement step, ultimately achieving perfectly aligned teeth.',
  '/public/dental_before2.jpg',
  '/public/dental_after2.jpg',
  '牙齿美容',
  false, true, false, false, false,
  2, true
),

-- 注射提升案例
(
  '玻尿酸全脸年轻化',
  'Full Face Rejuvenation with Hyaluronic Acid',
  '针对客户面部凹陷和皱纹问题，采用进口玻尿酸进行全脸填充和提升。重点填充苹果肌、太阳穴和法令纹区域，配合肉毒素去除动态皱纹。整个过程30分钟，即刻见效，效果自然持久12-18个月。',
  'For facial depression and wrinkle concerns, we used imported hyaluronic acid for full face filling and lifting. Key areas included apple cheeks, temples, and nasolabial folds, combined with Botox for dynamic wrinkles. The 30-minute procedure showed immediate results, naturally lasting 12-18 months.',
  '/public/injection_before1.jpg',
  '/public/injection_after1.jpg',
  '注射提升',
  false, false, true, false, false,
  1, true
),
(
  '肉毒素瘦脸 - 精致小V脸',
  'Botox Face Slimming - Refined V-line',
  '通过精准注射肉毒素到咬肌，实现自然瘦脸效果。无需手术，15分钟完成，2周后开始见效，3个月达到最佳状态。配合下颌线提升注射，打造完美小V脸轮廓。',
  'Through precise Botox injection into masseter muscles, we achieved natural face slimming. No surgery required, completed in 15 minutes, results visible after 2 weeks, optimal at 3 months. Combined with jawline lifting injection for perfect V-line contour.',
  '/public/injection_before2.jpg',
  '/public/injection_after2.jpg',
  '注射提升',
  false, false, true, false, false,
  2, true
),

-- 身体塑形案例
(
  '腰腹环吸 - S曲线塑造',
  'Waist and Abdomen Liposuction - S-curve Sculpting',
  '采用水动力环吸技术，精确去除腰腹部顽固脂肪。手术采用微创小切口，恢复快无明显疤痕。配合脂肪移植到臀部，打造完美S曲线。术后穿塑身衣3个月，效果永久持久。',
  'Using water-jet assisted liposuction technology to precisely remove stubborn waist and abdomen fat. The minimally invasive procedure with small incisions ensures fast recovery with no visible scars. Combined with fat grafting to buttocks for perfect S-curve. Wear compression garment for 3 months post-op for permanent lasting results.',
  '/public/body_before1.jpg',
  '/public/body_after1.jpg',
  '身体塑形',
  false, false, false, true, false,
  1, true
),

-- 植发案例
(
  'FUE无痕植发 - 自然发际线',
  'FUE Scarless Hair Transplant - Natural Hairline',
  '采用最新FUE技术，单根提取移植毛囊，无线性疤痕。为客户设计自然发际线，移植3000单位毛囊。手术采用局部麻醉，无痛感。术后6个月新发开始生长，12个月达到最终效果，存活率95%以上。',
  'Using latest FUE technology with individual follicle extraction and transplantation, leaving no linear scars. Designed natural hairline with 3000 grafts transplanted. Local anesthesia ensured painless procedure. New hair growth starts at 6 months, final results at 12 months, with over 95% survival rate.',
  '/public/hair_before1.jpg',
  '/public/hair_after1.jpg',
  '植发',
  false, false, false, false, true,
  1, true
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 4. 客户评价数据
-- =====================================================

INSERT INTO testimonials (
  image1_url, image2_url, image3_url,
  message, customer_name, display_order, is_active
) VALUES
(
  '/Gemini_Generated_Image_94iwds94iwds94iw.png',
  '/Gemini_Generated_Image_a16ssqa16ssqa16s.png',
  '/Gemini_Generated_Image_fv9uk0fv9uk0fv9u.png',
  '非常专业的医疗团队！从咨询到手术全程都很贴心。医生很耐心地解答了我所有的疑问，手术过程很顺利，恢复也比预期快。现在的鼻子非常自然，朋友们都说变化很大但看不出做过整形。强烈推荐！',
  'Sophie Chen',
  1, true
),
(
  '/Gemini_Generated_Image_iubeodiubeodiube.png',
  '/Gemini_Generated_Image_lv6nndlv6nndlv6n.png',
  '/Gemini_Generated_Image_pf7kappf7kappf7k.png',
  '我做了牙齿贴面美白，效果太棒了！整个过程很舒适，医生技术很专业。现在笑起来特别自信，牙齿又白又整齐。诊所环境也很好，服务态度一流。价格合理，性价比很高！',
  'Lisa Wang',
  2, true
),
(
  '/Gemini_Generated_Image_qvpx6jqvpx6jqvpx.png',
  '/Gemini_Generated_Image_scqqizscqqizscqq_(1).png',
  '/Gemini_Generated_Image_u1lac1u1lac1u1la.png',
  '玻尿酸填充效果超出预期！医生审美很好，知道如何打造自然的效果。注射时几乎没有疼痛感，术后也没有任何不适。现在脸部线条更立体，看起来年轻了好几岁。会定期来维护的！',
  'Emma Martin',
  3, true
),
(
  '/24a1e5e820d6d721e7aa3970ae648b43.jpg',
  '/3ba84e3181bb4794304515b7dc9aad6f.jpg',
  '/3d931fc8d4b7d9ba6357f51f842da33d.jpg',
  '腰腹吸脂改变了我的身材！手术恢复比想象中快，疤痕几乎看不见。医生很细心，术前沟通充分，术后跟踪服务也很到位。现在可以自信地穿紧身衣服了，整体气质都提升了！',
  'Marie Dubois',
  4, true
),
(
  '/5ef6dae25777256ca4e3fafedffbbea9.jpg',
  '/6492d5ffd9ae5616e415a8afbe984073.jpg',
  '/68744e766a6b63d88f86d714366bcd31.jpg',
  '植发手术非常成功！医生技术精湛，设计的发际线很自然。现在新头发已经长得很好了，完全看不出是植发的。整个过程很专业，术后护理指导也很详细。终于解决了困扰多年的脱发问题！',
  'James Lee',
  5, true
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- 完成提示
-- =====================================================

-- 查看导入结果
SELECT 'FAQs 导入成功' as message, COUNT(*) as count FROM faqs;
SELECT '简单案例导入成功' as message, COUNT(*) as count FROM case_studies;
SELECT '详细案例导入成功' as message, COUNT(*) as count FROM detailed_cases;
SELECT '客户评价导入成功' as message, COUNT(*) as count FROM testimonials;

-- =====================================================
-- 注意事项：
-- 1. 运行此脚本前请确保已运行所有迁移文件
-- 2. 图片URL需要替换为您实际上传的图片地址
-- 3. 建议先上传图片到 case-images 存储桶，然后更新URL
-- 4. 可以根据实际需求修改和添加更多数据
-- =====================================================
